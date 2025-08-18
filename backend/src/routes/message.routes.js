import express from 'express';
import messageController from '../controller/message.controller.js';



const router = express.Router();


router.post('/send-message', messageController.createMessage);
export default router;