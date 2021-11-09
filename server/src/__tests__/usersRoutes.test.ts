import axios from "axios"
import { User } from "../entities/User"

test("testing /register route", async () => {
  const user = new User("test", "test@test.com", "123456")

  const response = await axios.post(
    "http://localhost:3333/api/v1/register",
    user
  )

  expect(response.status).toBe(200)
})

test("testing /login route", async () => {
  const response = await axios.post("http://localhost:3333/api/v1/login", {
    email: "test@test.com",
    password: "123456",
  })

  expect(response.status).toBe(200)
})
