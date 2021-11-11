import axios from "axios"
import { User } from "../models/User"

test("testing /register route", async () => {
  const user = new User("test", "test@test.com", "123456")

  const response = await axios.post(
    "http://localhost:3333/api/v1/register",
    user
  )

  expect(response.status).toBe(200)
})