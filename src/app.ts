import express, {Application} from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index.router";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

export default app;
