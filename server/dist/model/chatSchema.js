"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    members: {
        type: Array,
    },
    update: {
        type: Number,
        default: null
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('chat', chatSchema);
