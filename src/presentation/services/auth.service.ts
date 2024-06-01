import { UserModel } from '../../data';
import { CustomError, RegisterUserDto } from '../../domain';

export class AuthService {

    // D.I.
    constructor() {}

    public async registerUser( registerUserDto: RegisterUserDto ) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if ( existUser ) throw CustomError.badRequest('Email already exist');

        return 'Everything ok!';
    }

}

