import { Router } from 'express';
import { auth } from './middlewares/auth';
import {
  CreateBillController,
  DeleteBillController,
  GetAllBillsController,
  GetBillController,
  GetProfileController,
  LoginController,
  RegisterController,
  UpdateBillController,
} from './controllers';

const routes = Router();

// Public Routes
routes.post('/register', RegisterController.execute);
routes.post('/login', LoginController.execute);
routes.get('/profile', GetProfileController.execute);

// Private Routes
routes.get('/bills', auth(), GetAllBillsController.execute);
routes.get('/bills/:id', auth(), GetBillController.execute);
routes.post('/bills', auth(), CreateBillController.execute);
routes.put('/bills', auth(), UpdateBillController.execute);
routes.delete('/bills/:id', auth(), DeleteBillController.execute);

export { routes };
