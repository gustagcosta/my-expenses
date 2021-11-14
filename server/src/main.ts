import "./dotenv"
import express from "express"
import { routes } from "./routes"
import { errorHandler, notFound } from "./middlewares/error"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Salve...")
})

app.use("/api/v1", routes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})