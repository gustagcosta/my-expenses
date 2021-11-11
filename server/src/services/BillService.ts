import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { hash } from "bcryptjs"
import { User } from "../models/User"
import { validateEmail } from "../utils/validateEmail"
import { db } from "../database/db"
import { Bill } from "../models/Bill"

type BillRequest = {
  description: string
  expire_date: Date
  value: number
  user_id: number
}

class BillService {
  async index(): Promise<object | Error> {
    try {
      return await db("bills").select("*")
    } catch (error) {
      return new Error("Error while trying to load bills")
    }
  }

  async show(id: number): Promise<object | Error> {
    try {
      const bill = await db("bills").select("*").where("id", "=", id).first()

      if (!bill) {
        return new Error("Bill not found")
      }

      return bill
    } catch (error) {
      return new Error("Error while trying to load bills")
    }
  }

  async store({
    description,
    expire_date,
    value,
    user_id,
  }: BillRequest): Promise<object | Error> {
    try {
      if (description.length < 3) {
        return new Error("Description field must have more than 3 caracteres")
      }

      if (value < 0) {
        return new Error("Value field must be greater than zero")
      }

      const bill = new Bill()
      bill.description = description
      bill.expire_date = expire_date
      bill.value = value
      bill.user_id = user_id

      await db("bills").insert(bill)

      return bill
    } catch (error) {
      return new Error("Error while trying to load bills")
    }
  }
}

export default new BillService()
