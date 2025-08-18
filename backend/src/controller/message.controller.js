import messageModel from "../models/message.model.js";

export const createMessage = async (req, res) => {
    try {
        const { Name, Email, Subject, Message } = req.body;
        const doc = await messageModel.create({
            Name,
            Email,
            Subject,
            Message
        });
        res.status(201).json({
            message: "Message sent successfully",
            data: doc
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to send message"
        });
    }
};

export default { createMessage };