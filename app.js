import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDatabase from "./src/configs/db.configs.js";
import courseRouter from "./src/routes/course.routes.js";
import subscriberRouter from "./src/routes/subscriber.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert {type: "json"};
import userRouter from "./src/routes/user.routes.js";

connectDatabase();

dotenv.config();
const app = express();

var options = {
    customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

const port = process.env.PORT || 3330;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use("/", courseRouter);
app.use("/", subscriberRouter);
app.use("/", userRouter);

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