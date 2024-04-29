import express, { json } from "express";
import cors from "cors";
import { PORT } from "./config/Constants.js";
import { ErrorHandler } from "./middlewares/ErrorHandler.js";
import { connectToDatabse } from "./config/Database.js";
import UserRouter from "./routes/UserRoutes.js";
import { ResponseHandler } from "./middlewares/ResponseHandler.js";

await connectToDatabse();

const app = express();
app.use(cors());
app.use(json());
app.use(ResponseHandler);

app.get("/", (req, res) => {
  res.send("<h1>Bitts server is running!</h1>");
});

app.use("/v1/users", UserRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: "404! Not Found",
  });
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Bitts server running at ${PORT}`);
});
