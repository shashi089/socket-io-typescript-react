import express from "express"
import http from "http"
import cors from "cors"


const app = express()
app.use(cors({
    credentials:true,
}))
const server = http.createServer(app)

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/** Healthcheck */
app.get('/ping', (req:express.Request, res:express.Response, next: express.NextFunction) => {
    return res.status(200).json({ hello: 'world!' });
});
/** Error Handling */
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error: Error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});

/** Server Listen */
server.listen(8080,()=>{
    console.log("Server is Running")
})
