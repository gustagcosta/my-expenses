import { Router, Request, Response } from 'express';
import { auth } from './middlewares/auth';
import {
  CreateBillController,
  DeleteBillController,
  GetAllBillsController,
  GetBillController,
  LoginController,
  RegisterController,
  UpdateBillController,
} from './controllers';
import { StatusBillController } from './controllers/status-bill.controller';

const routes = Router();

// Public Routes
routes.post('/login', LoginController.execute);
routes.post('/register', RegisterController.execute);

// Private Routes
routes.get('/bills', auth(), GetAllBillsController.execute);
routes.get('/bills/:id', auth(), GetBillController.execute);
routes.post('/bills', auth(), CreateBillController.execute);
routes.put('/bills', auth(), UpdateBillController.execute);
routes.delete('/bills/:id', auth(), DeleteBillController.execute);
routes.put('/bills/:id/:done', auth(), StatusBillController.execute);

export { routes };
