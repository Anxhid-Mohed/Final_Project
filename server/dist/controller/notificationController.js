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
exports.userNotification = void 0;
const notificationSchema_1 = __importDefault(require("../model/notificationSchema"));
const userNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderId, receiverId, content } = req.body;
        if (senderId && receiverId && content) {
            const doc = new notificationSchema_1.default({
                senderId,
                receiverId,
                content,
            });
            yield doc.save();
            res.status(200).json({ status: true, message: 'success' });
        }
        else {
            res.json({ status: false, message: 'failed' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.userNotification = userNotification;
