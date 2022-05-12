import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDatabase from "./src/configs/db.configs.js";
import courseRouter from "./src/routes/course.routes.js";
import subscriberRouter from "./src/routes/subscriber.routes.js";

connectDatabase();

dotenv.config();
const app = express();
const port = process.env.PORT || 3330;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use("/", courseRouter);
app.use("/", subscriberRouter);

app.get("/", (req, res) => {
    console.log("dsadasdas");
    res.json({
           message: "Hell World"
    });
});

app.get("/api/", (req, res) => {
    console.log("dsadasdas");
    res.json({
           message: "Xin chao"
    });
});

app.listen(port, () => {
    console.log(`Server is listening on https://localhost:${port}`);
});