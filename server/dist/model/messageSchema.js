"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    chatId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    text: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('message', messageSchema);
