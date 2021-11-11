import { Request, Response } from "express"

class BillController {
  async index(request: Request, response: Response) {
    const result = {}

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }

  async show(request: Request, response: Response) {
    const result = {}

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }

  async store(request: Request, response: Response) {
    const result = {}

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }

  async update(request: Request, response: Response) {
    const result = {}

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }

  async destroy(request: Request, response: Response) {
    const result = {}

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}

export default new BillController()
