"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reportSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'posts'
    },
    reason: {
        type: String,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('reports', reportSchema);
