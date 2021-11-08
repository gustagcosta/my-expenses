import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController"
import { LoginController } from "./controllers/LoginController"
import { admin } from "./middlewares/admin"
import { auth } from "./middlewares/auth"

const routes = Router()

routes.post("/register", new CreateUserController().handle)
routes.post("/login", new LoginController().handle)

routes.get("/private", [auth()], (req, res) => {
  res.send("Private route")
})

routes.get("/admin", [auth(), admin()], (req, res) => {
  res.send("Admin route")
})

routes.get("/public", (req, res) => {
  res.send("Public route")
})

export { routes }
