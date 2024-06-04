import { NextFunction, Request, Response } from 'express';

export class FileUploadMiddleware {

    static containFiles(req: Request, res: Response, next: NextFunction) {

        if ( !req.files || Object.keys(req.files).length === 0 ) {
            return res.status(400).json({ error: 'No files were selected' });
        }

        // Si no es un arreglo, entonces es el objeto de la imagen
        if ( !Array.isArray( req.files.file ) ) {
            req.body.files = ( req.files.file );
        } else {
            req.body.files = req.files.file;
        }

        next();
    }

}


