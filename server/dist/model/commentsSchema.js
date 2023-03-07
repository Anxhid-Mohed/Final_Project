"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'posts',
    },
    comment: {
        type: String,
    },
    likes: [{
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'users',
            }
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('comments', commentSchema);
