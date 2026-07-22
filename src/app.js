import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "50kb"}));
app.use(express.urlencoded({extended: true, limit: "50kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRoutes from "./routes/user.routes.js";


// routes declaration
app.use("/api/v1/users", userRoutes);

app.use((err, req, res, next) => {
    if (err?.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
            message: `Unexpected file field '${err.field}'. Allowed fields are 'avatar' and 'coverImage'.`
        });
    }

    return res.status(err?.statusCode || 500).json({
        message: err?.message || "Internal Server Error"
    });
});

export {app};