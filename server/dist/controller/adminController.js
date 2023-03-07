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
exports.removeReportedPost = exports.postView = exports.reportsList = exports.requestsRejection = exports.requestsApproval = exports.requestsList = exports.usersUnBlockings = exports.usersBlockings = exports.usersList = exports.adminSignin = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const adminSchema_1 = __importDefault(require("../model/adminSchema"));
const requestSchema_1 = __importDefault(require("../model/requestSchema"));
const reportsSchema_1 = __importDefault(require("../model/reportsSchema"));
const postsSchema_1 = __importDefault(require("../model/postsSchema"));
const commentsSchema_1 = __importDefault(require("../model/commentsSchema"));
//---> Admin Sign in <---// 
const adminSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ status: false, message: 'All feilds are required' });
        }
        const admin = yield adminSchema_1.default.findOne({ email: email });
        console.log(admin);
        if (!admin) {
            res.status(400).json({ status: false, message: 'Admin not found' });
        }
        const adminPass = admin === null || admin === void 0 ? void 0 : admin.password;
        const isMatched = yield (0, bcrypt_1.compare)(password, adminPass);
        if (!isMatched) {
            res.status(400).json({ status: false, message: 'Your email or password is incorrect' });
        }
        const adminEmail = admin === null || admin === void 0 ? void 0 : admin.email;
        if (!adminEmail === email || !isMatched) {
            res.status(400).json({ status: false, message: 'Your email or password is incorrect' });
        }
        const token = jsonwebtoken_1.default.sign({ adminId: admin === null || admin === void 0 ? void 0 : admin._id }, process.env.JWTS_KEY, { expiresIn: '3d' });
        res.status(200).json({ auth: true, token: token, message: 'Login successful' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.adminSignin = adminSignin;
//---> Users Listing <---// 
const usersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userSchema_1.default.find();
        console.log(users);
        res.status(200).json({ status: true, data: users, message: 'get users successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.usersList = usersList;
//---> Users Blocking <---// 
const usersBlockings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.id;
        console.log(userId);
        yield userSchema_1.default.findOneAndUpdate({ _id: userId }, { isBanned: true });
        res.status(200).json({ status: true, message: 'user blocked successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.usersBlockings = usersBlockings;
//---> Users UnBlocking <---// 
const usersUnBlockings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.id;
        console.log(userId);
        yield userSchema_1.default.findOneAndUpdate({ _id: userId }, { isBanned: false });
        res.status(200).json({ status: true, message: 'user unblocked successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.usersUnBlockings = usersUnBlockings;
//---> Requests Listing  <---//
const requestsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield requestSchema_1.default.find().populate('userId');
        if (requests) {
            res.status(200).json({ status: true, data: requests, message: 'get requests successfully' });
        }
        else {
            res.json({ status: false, message: 'No requests found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.requestsList = requestsList;
//---> Requests Approval <---//
const requestsApproval = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.query.id;
        const requester = yield requestSchema_1.default.findById(requestId);
        if (requester) {
            const userId = requester.userId;
            const user = yield userSchema_1.default.findById(userId);
            if (user) {
                yield userSchema_1.default.findOneAndUpdate({ _id: userId }, { category: requester.categories, creator: true });
                yield requestSchema_1.default.findByIdAndDelete({ _id: requester._id });
                res.status(200).json({ status: true, message: 'Your request has been approved' });
            }
            else {
                yield requestSchema_1.default.findByIdAndDelete({ _id: requester._id });
                res.json({ status: false, message: 'Requested user does not exist' });
            }
        }
        else {
            res.json({ status: false, message: 'Requested user does not exist' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.requestsApproval = requestsApproval;
//---> Requests Rejections <---//
const requestsRejection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.query.id;
        const requester = yield requestSchema_1.default.findById(requestId);
        if (requester) {
            yield requestSchema_1.default.findByIdAndDelete({ _id: requester._id });
            res.status(200).json({ status: true, message: 'request rejected successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.requestsRejection = requestsRejection;
const reportsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield reportsSchema_1.default.find({}).populate(['userId', 'postId']);
        console.log(reports);
        if (!reports)
            return res.json({ status: false, message: 'No reports found' });
        res.status(200).json({ status: true, data: reports, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.reportsList = reportsList;
const postView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.query.id;
        if (!postId)
            return res.json({ status: false, message: 'No post found' });
        const post = yield postsSchema_1.default.findById({ _id: postId }).populate('userId');
        if (post) {
            res.status(200).json({ status: true, data: post, message: 'success' });
        }
        else {
            yield reportsSchema_1.default.findByIdAndDelete({ postId: postId });
            res.json({ status: false, message: 'post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.postView = postView;
const removeReportedPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.query.id;
        console.log(postId);
        if (!postId)
            return res.json({ status: false, message: 'failed to remove post' });
        yield postsSchema_1.default.findByIdAndDelete({ _id: postId });
        yield reportsSchema_1.default.findOneAndDelete({ postId: postId });
        yield commentsSchema_1.default.findOneAndDelete({ postId });
        res.status(200).json({ status: true, message: 'removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.removeReportedPost = removeReportedPost;
