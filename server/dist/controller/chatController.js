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
exports.findChat = exports.userChats = exports.createChat = void 0;
const chatSchema_1 = __importDefault(require("../model/chatSchema"));
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.senderId, req.body.receiverId);
        const newChat = new chatSchema_1.default({
            members: [req.body.senderId, req.body.receiverId]
        });
        const result = yield newChat.save();
        res.status(200).json({ status: true, data: result, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.createChat = createChat;
const userChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chatSchema_1.default.find({
            members: { $in: [req.params.userId] }
        }).sort({ updatedAt: -1 });
        res.status(200).json({ status: true, data: chats, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.userChats = userChats;
const findChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chatSchema_1.default.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        });
        res.status(200).json({ status: true, data: chat, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.findChat = findChat;
