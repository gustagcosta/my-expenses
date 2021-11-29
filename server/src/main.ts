import "./dotenv";
import express from "express";
import { routes } from "./routes";
import { errorHandler, notFound } from "./middlewares/error";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "..", "..", "web", "build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "..", "..", "web", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
