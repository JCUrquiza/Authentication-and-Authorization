import { Request, Response } from 'express';

export class AuthController {

    // D.I.
    constructor() {}

    registerUser = (req: Request, res: Response) => {

        return res.json('registerUser')
    }

    loginUser = (req: Request, res: Response) => {

        return res.json('loginUser')
    }

    validateEmail = (req: Request, res: Response) => {

        return res.json('validaEmail')
    }

}




