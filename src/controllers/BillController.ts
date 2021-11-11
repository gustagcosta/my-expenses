import { Request, Response } from "express"
import BillService from "../services/BillService"

class BillController {
  async index(request: Request, response: Response) {
    const result = await BillService.index(request.userId)

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }

  async show(request: Request, response: Response) {
    const result = await BillService.show(request.params.id, request.userId)

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }

  async store(request: Request, response: Response) {
    const { description, expire_date, value } = request.body

    const userId = request.userId

    const result = await BillService.store({
      description,
      expire_date,
      value,
      userId,
    })

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }

  async update(request: Request, response: Response) {
    const { id, description, expire_date, value } = request.body

    const userId = request.userId

    const result = await BillService.update({
      id,
      description,
      expire_date,
      value,
      userId,
    })

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }

  async destroy(request: Request, response: Response) {
    const result = await BillService.destroy(request.params.id)

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}

export default new BillController()
