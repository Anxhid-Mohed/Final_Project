"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IntegrationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    Fullname: {
        type: String,
        required: true
    },
    AccountNumber: {
        type: Number,
        required: true
    },
    IFSC: {
        type: String,
        required: true
    },
    Branch: {
        type: String,
        required: true
    },
    TransactionId: {
        type: String,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Integrations', IntegrationSchema);
