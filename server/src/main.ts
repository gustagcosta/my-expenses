import "./dotenv"
import express, { NextFunction, Request, Response } from "express"
import { routes } from "./routes"

const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) =>
  res.send("salve")
)

app.use(routes)

app.listen(3333, () => {
  console.log("server running...")
})
