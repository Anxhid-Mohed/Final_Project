"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    receiverId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    content: {
        type: String,
    },
    type: {
        type: String,
        default: 'normal'
    },
}, {
    timestamps: true,
    capped: {
        size: 1024,
        max: 1000,
        autoIndexId: true,
    }
});
exports.default = (0, mongoose_1.model)('notifications', notificationSchema);
