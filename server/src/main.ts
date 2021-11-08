import "./dotenv"
import express from "express"
import { routes } from "./routes"
import { errorHandler, notFound } from "./middlewares/error"

const app = express()

app.use(express.json())

app.use("/api/v1", routes)

app.use(notFound);
app.use(errorHandler);

app.listen(3333, () => {
  console.log("server running...")
})
