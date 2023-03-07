"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    name: {
        type: String,
    },
    username: {
        type: String,
        trim: true
    },
    about: {
        type: String,
    },
    socialLink: {
        type: String,
    },
    category: {
        type: String,
        default: null,
    },
    profile: {
        type: String,
        default: null
    },
    coverImage: {
        type: String,
        default: null
    },
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    followings: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('users', userSchema);
