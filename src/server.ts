import express, {Application, Request, Response, NextFunction} from "express";
import cors from "cors";
import mockRoutes from "./routes/mockRoutes";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000");

//midd
app.use(cors());
app.use(express.json());

app.use((req:Request, res:Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


//routes
app.use('/server/mock', mockRoutes);
  
app.get('/healt', (req:Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//error handling
app.use((error:Error, req:Request, res: Response, next: NextFunction ) => {
    console.log(error.stack);
    res.status(500).json({
        error: 'Error inside the server'
    });
});

