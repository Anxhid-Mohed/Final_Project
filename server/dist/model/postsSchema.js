"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    post: {
        type: String,
    },
    caption: {
        type: String,
    },
    like: [{
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'users',
            }
        }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('posts', postSchema);
