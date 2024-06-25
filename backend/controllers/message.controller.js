import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"; // Giả định rằng bạn đang export io từ file socket.js

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.userId;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// Save the conversation and new message in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            console.log(`Emitting newMessage to socket ID: ${receiverSocketId}`);
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } else {
            console.log(`No socket ID found for receiver: ${receiverId}`);
        }

		res.status(201).json({ newMessage });
	} catch (error) {
		console.error("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.userId;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.error("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};