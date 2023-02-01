import express, {Application} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.router";
import { CLIENT_URL } from "./config/enviroment";

const app: Application = express();

// app.use(limiter);
// app.use(csrf({ cookie: true }))
app.use(express.json());
app.use(cors({
    origin: CLIENT_URL
}))
app.use(cookieParser());

app.use("/api", router);

export default app;
