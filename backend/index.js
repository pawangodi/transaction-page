import express  from 'express'
const app = express()
import dotenv from "dotenv"
import databaseConnection from './config/database.js'
import cookieParser from "cookie-parser"
import transactionRouter from './routes/transactionsRoute.js'
import cors from "cors"

dotenv.config({
  path : ".env"
})
databaseConnection()

//middleware
app.use(express.urlencoded({
  extended : true
}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

//API 
app.use("/api/v1/transaction/create" , transactionRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})