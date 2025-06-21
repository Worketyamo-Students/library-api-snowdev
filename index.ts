import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import morgan from "morgan"
import userRouter from "./routes/userRoutes"
import bookRoutes from './routes/bookRoutes'
import borrowRoutes from './routes/borrowRoutes'


const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"))
app.use("/users",userRouter)
app.use('/books',bookRoutes);
app.use('/loans',borrowRoutes)


const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running on port ${port}`);
});
