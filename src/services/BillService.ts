import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { hash } from "bcryptjs"
import { User } from "../models/User"
import { validateEmail } from "../utils/validateEmail"
import { db } from "../database/db"
import { Bill } from "../models/Bill"

type BillStoreRequestDTO = {
  description: string
  expire_date: Date
  value: number
  userId: string
}

type BillUpdateRequestDTO = {
  description: string
  expire_date: Date
  value: number
  userId: string
  id: string
}

class BillService {
  async index(userId: string): Promise<object | Error> {
    try {
      return await db("bills").select("*").where("id_user", "=", userId)
    } catch (error) {
      console.error(error)
      return new Error("Error while trying to load bills")
    }
  }

  async show(id: string, userId: string): Promise<object | Error> {
    try {
      const bill = await db("bills")
        .select("*")
        .where("id", "=", id)
        .where("id_user", "=", userId)
        .first()

      if (!bill) {
        return new Error("Bill not found")
      }

      return bill
    } catch (error) {
      console.error(error)
      return new Error("Error while trying to load bills")
    }
  }

  async store({
    description,
    expire_date,
    value,
    userId,
  }: BillStoreRequestDTO): Promise<object | Error> {
    try {
      if (description.length < 3) {
        return new Error("Description field must have more than 3 caracteres")
      }

      if (value < 0) {
        return new Error("Value field must be greater than 0")
      }

      const bill = new Bill()
      bill.description = description
      bill.expire_date = expire_date
      bill.value = value
      bill.user_id = userId

      await db("bills").insert(bill)

      return bill
    } catch (error) {
      console.error(error)
      return new Error("Error while trying to load bills")
    }
  }

  async update({
    id,
    description,
    expire_date,
    value,
    userId,
  }: BillUpdateRequestDTO): Promise<object | Error> {
    try {
      if (description.length < 3) {
        return new Error("Description field must have more than 3 caracteres")
      }

      if (value < 0) {
        return new Error("Value field must be greater than 0")
      }

      const bill = await db("bills").select("*").where("id", "=", id).first()

      if (!bill) {
        return new Error("Bill with this id not found")
      }

      bill.description = description
      bill.expire_date = expire_date
      bill.value = value
      bill.user_id = userId

      await db("bills").update(bill)

      return bill
    } catch (error) {
      console.error(error)
      return new Error("Error while trying to load bills")
    }
  }

  async destroy(id: string): Promise<void | Error> {
    try {
      await db("bills").del(id)
    } catch (error) {
      console.error(error)
      return new Error("Error while trying to load bills")
    }
  }
}

export default new BillService()
