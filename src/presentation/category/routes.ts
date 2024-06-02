import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middlewares';

export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new CategoryController
    
    // Definir las rutas
    router.get('/', controller.getCategories);
    router.post('/', [ AuthMiddleware.validateJWT ], controller.createCategory);

    return router;
  }

}

