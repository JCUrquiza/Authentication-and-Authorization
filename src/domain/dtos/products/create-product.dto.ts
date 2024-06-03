import { Validators } from "../../../config";


export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: boolean,
        public readonly user: string, // ID
        public readonly category: string, // ID
    ) {}

    static create( object:{[key:string]: any} ): [string?, CreateProductDto?] {
        const { name, available, price, description, user, category } = object;

        if ( !name ) return ['Missing name'];
        if ( !user ) return ['Missing user'];
        if ( !category ) return ['Missing category'];

        if ( !Validators.isMongoId(user) ) return ['Invalid User ID'];
        if ( !Validators.isMongoId(category) ) return ['Invalid User ID'];

        return [undefined, new CreateProductDto(name, !!available, price, description, user, category)];

    }

}
