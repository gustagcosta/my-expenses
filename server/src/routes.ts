import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController"
import { LoginController } from "./controllers/LoginController"

const routes = Router()

routes.post("/register", new CreateUserController().handle)
routes.post("/login", new LoginController().handle)

export { routes }
