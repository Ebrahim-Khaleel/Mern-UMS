import dotenv from "dotenv"
dotenv.config()

import express from 'express';
import mongoose from "mongoose";
import cors from "cors"

import userRoute from "./routes/users.js"
import adminRoute from "./routes/admin.js"

// database connection
mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log("Mongodb Connected"))
    .catch((error)=>console.log("Error connecting Mongodb", error))

const app = express();

app.use(express.json())
app.use(cors({origin : "*"}));

app.use('/',userRoute);
app.use('/admin',adminRoute)

app.listen(process.env.PORT);
export default app;