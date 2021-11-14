import { db } from "../database/db"
import { Bill } from "../models/Bill"
import moment from "moment"

type BillStoreRequestDTO = {
  description: string
  expire_date: string
  value: number
  userId: string
}

type BillUpdateRequestDTO = {
  description: string
  expire_date: string
  value: number
  userId: string
  id: string
}

class BillService {
  async index(userId: string): Promise<object | Error> {
    try {
      return await db("bills").select("*").where("user_id", "=", userId)
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
        .where("user_id", "=", userId)
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

      if (!moment(expire_date, "YYYYMMDD", true).isValid()) {
        return new Error("Expire date field must is invalid")
      }

      if (!Number(value)) {
        return new Error("value field must be a number")
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

      const bill = await db("bills")
        .select("*")
        .where("user_id", "=", userId)
        .where("id", "=", id)
        .first()

      if (!bill) {
        return new Error("Bill with this id not found")
      }

      if (!moment(expire_date, "YYYYMMDD", true).isValid()) {
        return new Error("Expire date field must is invalid")
      }

      if (!Number(value)) {
        return new Error("value field must be a number")
      }

      await db("bills")
        .update({
          description,
          expire_date,
          value,
        })
        .where("id", "=", id)
    } catch (error) {
      console.error(error)
      return new Error("Error while trying to load bills")
    }
  }

  async destroy(id: string): Promise<void | Error> {
    try {
      await db("bills").where("id", "=", id).del()
    } catch (error) {
      console.error(error)
      return new Error("Error while trying to load bills")
    }
  }
}

export default new BillService()
