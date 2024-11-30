import dotenv from "dotenv"
dotenv.config()

import express from 'express';
import mongoose from "mongoose";
import cors from "cors"

import authRoute from "./routes/auth.js"
import adminRoute from "./routes/admin.js"
import userRoute from "./routes/users.js"

// database connection
mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log("Mongodb Connected"))
    .catch((error)=>console.log("Error connecting Mongodb", error))

const app = express();

app.use(express.json())
app.use(cors({origin : "*"}));

app.use('/',authRoute);
app.use('/admin',adminRoute);
app.use('/user',userRoute);

const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Server running on PORT : ${PORT}`));
export default app;