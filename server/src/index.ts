import express from "express";
import dotenv from "dotenv";
import bodyParser  from "body-parser";
import cors from "cors";
import helmet   from "helmet";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from './routes/productRoutes';
import usersRoutes from './routes/userRoutes'
import expenseRoutes from './routes/expenseRoutes'
// configurations
dotenv.config();
const app=express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())

// routes
// server
app.use("/dashboard",dashboardRoutes);
app.use("/",dashboardRoutes)
app.use('/products',productRoutes)
app.use('/users',usersRoutes)
app.use('/expenses',expenseRoutes)
const port=process.env.PORT || 3001;
app.listen(port,()=>{
    console.log( `Server running on port ${port}`)
})
