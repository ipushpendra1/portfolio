import express from 'express';
const app = express();
import messageRoutes from './src/routes/message.routes.js';


app.use(express.json());
app.use('/', messageRoutes);




export default app;