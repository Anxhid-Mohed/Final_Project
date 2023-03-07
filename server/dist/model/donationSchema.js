"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const donationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    amount: {
        type: Number,
        required: true
    },
    donators: [{
            donorId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'users'
            },
            amount: {
                type: Number,
            },
            note: {
                type: String,
            },
            createdAt: {
                type: Date
            }
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('donations', donationSchema);
