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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['accesstoken'];
        console.log(req.headers);
        if (!token) {
            console.log('no token');
            res.json({ status: false, message: 'You need to provide a token' });
        }
        else {
            console.log('token');
            jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (error, decoded) => {
                if (error) {
                    console.log('token error');
                    console.log(error);
                    res.json({ status: false, auth: false, message: 'authentication failed' });
                }
                else {
                    console.log('worked');
                    console.log(decoded);
                    const { userId } = decoded;
                    console.log('userId kitty midw', userId);
                    req.userId = userId;
                    next();
                }
            });
        }
    }
    catch (error) {
        res.json({ status: false, auth: false, message: 'authentication error' });
    }
});
exports.verifyToken = verifyToken;
