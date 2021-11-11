import axios from "axios"

test("testing /login route", async () => {
  const response = await axios.post("http://localhost:3333/api/v1/login", {
    email: "test@test.com",
    password: "123456",
  })

  expect(response.status).toBe(200)
})
