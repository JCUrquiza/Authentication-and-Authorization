import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middlewares';
import { ProductController } from './controller';

export class ProductRoutes {

  static get routes(): Router {

    const router = Router();
    // const categoryService = new CategoryService();
    const controller = new ProductController();
    
    // Definir las rutas
    router.get('/', controller.getProducts);
    router.post('/', [ AuthMiddleware.validateJWT ],controller.createProduct);
    // router.post('/', [ AuthMiddleware.validateJWT ], controller.createCategory);

    return router;
  }

}

