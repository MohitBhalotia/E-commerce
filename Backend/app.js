import "express-async-errors";
import express from "express";
import cors from "cors";
import "dotenv/config"; // 'dotenv'.config()

import connectDB from "./src/config/mongoDB.js";
import connectCloudinary from "./src/config/cloudinary.js";

import userRouter from "./src/routes/userRoute.js";
import productRouter from "./src/routes/productRoute.js";
import cartRouter from "./src/routes/cartRoute.js";

import notFound from "./src/middleware/not-found.js";
import errorHandler from "./src/middleware/error-handler.js";

// App Config
const app = express();
const port = process.env.PORT || 5000;
const url = process.env.MONGO_URI;

connectDB(url);
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/v1/user", userRouter);
app.use('/api/v1/product',productRouter)
app.use('/api/v1/cart',cartRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log("Server started on PORT : " + port));
