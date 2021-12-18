import { Request, Response } from "express";
import BillService from "../services/BillService";
import { CustomError } from "../utils/customError";

class BillController {
  async index(request: Request, response: Response) {
    const result = await BillService.index(request.userId);

    if (result instanceof CustomError) {
      return response.status(result.statusCode).json(result.message);
    }

    return response.json(result);
  }

  async show(request: Request, response: Response) {
    const result = await BillService.show(request.params.id, request.userId);

    if (result instanceof CustomError) {
      return response.status(result.statusCode).json(result.message);
    }

    return response.json(result);
  }

  async store(request: Request, response: Response) {
    const { description, expire_date, value } = request.body;

    const userId = request.userId;

    const result = await BillService.store({
      description,
      expire_date,
      value,
      userId
    });

    if (result instanceof CustomError) {
      return response.status(result.statusCode).json(result.message);
    }

    return response.json(result);
  }

  async update(request: Request, response: Response) {
    const { id, description, expire_date, value } = request.body;

    const userId = request.userId;

    const result = await BillService.update({
      id,
      description,
      expire_date,
      value,
      userId
    });

    if (result instanceof CustomError) {
      return response.status(result.statusCode).json(result.message);
    }

    return response.json(result);
  }

  async destroy(request: Request, response: Response) {
    const result = await BillService.destroy(request.params.id);

    if (result instanceof CustomError) {
      return response.status(result.statusCode).json(result.message);
    }

    return response.json(result);
  }
}

export default new BillController();
