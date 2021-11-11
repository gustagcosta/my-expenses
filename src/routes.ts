import { Router } from "express"
import SessionController from "./controllers/SessionController"
import BillController from "./controllers/BillController"
import UserController from "./controllers/UserController"
import { authentication } from "./middlewares/authentication"

const routes = Router()

routes.post("/register", UserController.store)
routes.post("/login", SessionController.login)

routes.get("/bills", authentication(), BillController.index)
routes.get("/bills/:id", authentication(), BillController.show)
routes.post("/bills", authentication(), BillController.store)
routes.put("/bills", authentication(), BillController.update)
routes.delete("/bills/:id", authentication(), BillController.destroy)

export { routes }
