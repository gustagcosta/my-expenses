import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController"
import { LoginController } from "./controllers/LoginController"
import { authentication } from "./middlewares/authentication"
import { authorization } from "./middlewares/authorization"

const routes = Router()

routes.post("/register", new CreateUserController().handle)
routes.post("/login", new LoginController().handle)

routes.get(
  "/admin",
  [authentication(), authorization(["admin"])],
  (req, res) => {
    res.send("Admin route")
  }
)

routes.get("/public", (req, res) => {
  res.send("Public route")
})

export { routes }
