import { JwtAdapter, bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';

export class AuthService {

    // D.I.
    constructor() {}

    public async registerUser( registerUserDto: RegisterUserDto ) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if ( existUser ) throw CustomError.badRequest('Email already exist');

        try {
            
            const user = new UserModel(registerUserDto);
            
            // Encriptar el password
            user.password = bcryptAdapter.hash( registerUserDto.password );
            
            await user.save();

            // JWT <- para mantener la autenticación del usuario

            // Email de confirmación

            const { password, ...userEntity } = UserEntity.fromObject( user );

            const token = await JwtAdapter.generateToken({ id: user.id });
            if ( !token ) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: userEntity,
                token
            };

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }



    public async loginUser( loginUserDto: LoginUserDto ) {

        // findOne para verificar si existe
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if ( !user ) throw CustomError.badRequest('User not exist');

        // isMatch... bcrypt ...compare(123456, WQEFWQ$Q%"#$5tfqwsaf12314")
        const isMatching = bcryptAdapter.compare( loginUserDto.password, user.password );
        if ( !isMatching ) throw CustomError.badRequest('Password is not valid');

        const { password, ...userEntity } = UserEntity.fromObject( user );

        const token = await JwtAdapter.generateToken({ id: user.id });
        if ( !token ) throw CustomError.internalServer('Error while creating JWT');

        return {
            user: userEntity,
            token: token
        }

    }

}

