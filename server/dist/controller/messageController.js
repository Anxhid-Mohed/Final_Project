"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMessages = exports.getMessages = exports.addMessage = void 0;
const chatSchema_1 = __importDefault(require("../model/chatSchema"));
const messageSchema_1 = __importDefault(require("../model/messageSchema"));
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId, senderId, text } = req.body;
        const message = new messageSchema_1.default({
            chatId,
            senderId,
            text
        });
        const data = yield message.save();
        yield chatSchema_1.default.findOneAndUpdate({ _id: chatId }, {
            update: Math.random()
        });
        res.status(200).json({ status: true, data: data, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.addMessage = addMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        console.log(chatId);
        const result = yield messageSchema_1.default.find({ chatId });
        res.status(200).json({ status: true, data: result, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getMessages = getMessages;
const readMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const { chatId, userId } = req.params;
        yield messageSchema_1.default.updateMany({ chatId: chatId, senderId: userId }, {
            read: true
        });
        res.status(200).json({ status: true, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.readMessages = readMessages;
