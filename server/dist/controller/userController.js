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
exports.getDetails = exports.getPayouts = exports.getUserDatas = exports.getUserWallet = exports.ApproveDonation = exports.getUserBankInfo = exports.editUserBankInfo = exports.integrateBankAcc = exports.searchCreaters = exports.getAllCreaters = exports.deleteComments = exports.commentsLikes = exports.commentPost = exports.getPostComments = exports.reportPost = exports.likePost = exports.editPost = exports.removePost = exports.getAllFeeds = exports.getUserFeeds = exports.uploadPosts = exports.userFollowAndUnFollow = exports.accountDelete = exports.accountEnable = exports.accountDisable = exports.uploadCoverImage = exports.userPage = exports.profileManagement = exports.createrRequest = exports.userSignin = exports.accountVerification = exports.resendEmail = exports.userSignup = exports.verifyAuth = void 0;
const bcrypt_1 = require("bcrypt");
const nodeMailer_1 = require("../utils/nodeMailer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const verificationToken_1 = __importDefault(require("../model/verificationToken"));
const postsSchema_1 = __importDefault(require("../model/postsSchema"));
const requestSchema_1 = __importDefault(require("../model/requestSchema"));
const commentsSchema_1 = __importDefault(require("../model/commentsSchema"));
const BankSchema_1 = __importDefault(require("../model/BankSchema"));
const donationSchema_1 = __importDefault(require("../model/donationSchema"));
const reportsSchema_1 = __importDefault(require("../model/reportsSchema"));
const payoutsSchema_1 = __importDefault(require("../model/payoutsSchema"));
const node_cron_1 = __importDefault(require("node-cron"));
//---> Authentication-validation <---//
const verifyAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email && password) {
            let regEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
            if (regEmail.test(email)) {
                if (password.length >= 8) {
                    const userExit = yield userSchema_1.default.findOne({ email: email });
                    if (!userExit) {
                        const salt = yield (0, bcrypt_1.genSalt)(10);
                        const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
                        const doc = new userSchema_1.default({
                            email: email,
                            password: hashedPassword,
                            name: null,
                            username: null,
                            about: null,
                            socialLink: null,
                            profile: null,
                            coverImage: null,
                            isVerified: false,
                            isBanned: false,
                        });
                        yield doc.save();
                        const user = yield userSchema_1.default.findOne({ email: email });
                        const userId = user === null || user === void 0 ? void 0 : user._id;
                        res.json({ userId: userId, "status": "success", "message": "approved" });
                    }
                    else {
                        res.json({ "status": "failed", "message": "Your email already exist" });
                    }
                }
                else {
                    res.json({ "status": "failed", "message": "Password must be at least 8 characters" });
                }
            }
            else {
                res.json({ "status": "failed", "message": "Enter a valid email" });
            }
        }
        else {
            res.json({ "status": "failed", "message": "All feilds are required" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifyAuth = verifyAuth;
//---> User-Signup <---//
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = Object.assign({}, req.body);
        const userNameExist = yield userSchema_1.default.findOne({ username: userData.username });
        if (!userNameExist) {
            const userId = userData.userId;
            yield userSchema_1.default.findByIdAndUpdate(userId, {
                name: userData.name,
                username: userData.username,
                about: userData.about,
                socialLink: userData.social,
            });
            const user = yield userSchema_1.default.findById(userId);
            const email = user === null || user === void 0 ? void 0 : user.email;
            const username = user === null || user === void 0 ? void 0 : user.username;
            yield (0, nodeMailer_1.nodemailer)(userId, email);
            res.status(200).json({ status: true, data: username, message: 'success' });
        }
        else {
            res.json({ status: false, 'message': 'username already exists' });
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.userSignup = userSignup;
//---> Resend Email <---//
const resendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const user = yield userSchema_1.default.findById(userId);
        const email = user === null || user === void 0 ? void 0 : user.email;
        const isVerified = user === null || user === void 0 ? void 0 : user.isVerified;
        if (isVerified === false) {
            yield verificationToken_1.default.findOneAndDelete(userId, {});
            yield (0, nodeMailer_1.nodemailer)(userId, email);
            res.status(200).send({ status: true, message: 'check your email for verification' });
        }
        else {
            res.json({ status: false, message: 'your already verified your account' });
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.resendEmail = resendEmail;
//---> Email Account Activation <---//
const accountVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token } = req.body;
        const user = yield userSchema_1.default.findOne({ _id: id });
        if (!user)
            return res.json({ message: 'invalid link' });
        const userToken = yield verificationToken_1.default.findOne({
            userId: user._id,
            token: token
        });
        if (userToken) {
            yield userSchema_1.default.findByIdAndUpdate(user._id, {
                isVerified: true
            });
            yield userToken.remove();
            let userId = user._id;
            let KEY = process.env.JWT_KEY;
            const token = jsonwebtoken_1.default.sign({ userId }, KEY, { expiresIn: '3d' });
            res.status(200).json({ auth: true, token: token, message: 'Account verified,redirecting..' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.accountVerification = accountVerification;
//---> User Signin <---//
const userSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (email && password) {
            const user = yield userSchema_1.default.findOne({ email: email });
            // if(!user.isBanned){}
            if (user) {
                const userPass = user.password;
                const isMatched = yield (0, bcrypt_1.compare)(password, userPass);
                if (isMatched) {
                    const userEmail = user.email;
                    if (userEmail === email && isMatched) {
                        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '3d' });
                        res.status(200).json({ auth: true, token: token, message: 'Login successful' });
                    }
                    else {
                        res.status(400).json({ auth: false, message: 'Your email or password is incorrect' });
                    }
                }
                else {
                    res.status(400).json({ auth: false, message: 'Your email or password is incorrect' });
                }
            }
            else {
                res.status(400).json({ auth: false, message: 'User not exist' });
            }
        }
        else {
            res.status(400).json({ auth: false, message: 'All feilds are required' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.userSignin = userSignin;
//---> Creator Request <---//
const createrRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('userrrr', req.userId);
    try {
        const userId = req.userId;
        const { categories } = req.body;
        const existReq = yield requestSchema_1.default.findById(userId);
        if (!existReq) {
            let obj = {
                userId,
                categories
            };
            yield requestSchema_1.default.create(obj).then((response) => {
                console.log(response);
                res.status(200).json({ status: true, message: 'request sended successfully' });
            });
        }
        else {
            res.json({ status: false, message: 'You already sended' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.createrRequest = createrRequest;
//---> User Profile Management <---//
const profileManagement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = Object.assign({}, req.body);
        console.log(userData);
        yield userSchema_1.default.findByIdAndUpdate(userData.userId, {
            name: userData.name,
            about: userData.about,
            category: userData.category,
            socialLink: userData.social,
            profile: userData.profile
        });
        res.status(200).json({ status: true, message: 'profile updated successfully' });
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.profileManagement = profileManagement;
//---> User Page Management <---//
const userPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.query.username;
        console.log(username);
        const user = yield userSchema_1.default.findOne({ username: username });
        if (user) {
            res.status(200).json({ status: true, data: user, message: 'success' });
        }
        else {
            res.json({ status: false, message: 'something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.userPage = userPage;
const uploadCoverImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const image = req.body.image;
        if (image && userId) {
            yield userSchema_1.default.findByIdAndUpdate({ _id: userId }, { coverImage: image });
            res.status(200).json({ status: true, message: 'cover image successfully uploaded' });
        }
        else {
            res.json({ status: false, message: 'image not found' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.uploadCoverImage = uploadCoverImage;
//---> Account Disable <---//
const accountDisable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.userId);
        const userId = req.userId;
        yield userSchema_1.default.findByIdAndUpdate({ _id: userId }, { disabled: true });
        const user = yield userSchema_1.default.findById(userId);
        if (user === null || user === void 0 ? void 0 : user.disabled) {
            res.status(200).json({ status: true, message: 'account disabled' });
        }
        else {
            res.json({ status: false, message: 'account not disabled' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.accountDisable = accountDisable;
const accountEnable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.userId);
        const userId = req.userId;
        yield userSchema_1.default.findByIdAndUpdate({ _id: userId }, { disabled: false });
        const user = yield userSchema_1.default.findById(userId);
        console.log(typeof (user === null || user === void 0 ? void 0 : user.disabled));
        if ((user === null || user === void 0 ? void 0 : user.disabled) === false) {
            res.status(200).json({ status: true, message: 'account enabled' });
        }
        else {
            res.json({ status: false, message: 'account not enabled' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.accountEnable = accountEnable;
const accountDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const password = req.body.password;
        if (!userId || !password) {
            res.json({ status: false, message: 'All feilds are required' });
        }
        const user = yield userSchema_1.default.findOne({ _id: userId });
        console.log(user);
        if (user) {
            const currentPassword = user.password;
            const isMatched = yield (0, bcrypt_1.compare)(password, currentPassword);
            if (isMatched) {
                yield userSchema_1.default.findByIdAndDelete({ _id: userId });
                res.status(200).json({ status: true, message: 'account deleted successfully' });
            }
            else {
                res.json({ status: false, message: 'Please enter a valid password' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.accountDelete = accountDelete;
const userFollowAndUnFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Object(req.userId);
        const createrId = req.body.createrId;
        const user = yield userSchema_1.default.findById(userId);
        const exists = user === null || user === void 0 ? void 0 : user.followings.some((el) => el._id == createrId);
        if (createrId && userId) {
            if (!exists) {
                //Add to users followings list
                const user = yield userSchema_1.default.findById(userId);
                user === null || user === void 0 ? void 0 : user.followings.push(createrId);
                user === null || user === void 0 ? void 0 : user.save();
                //Add to creater followers list
                const creater = yield userSchema_1.default.findById(createrId);
                creater === null || creater === void 0 ? void 0 : creater.followers.push(userId);
                creater === null || creater === void 0 ? void 0 : creater.save();
                console.log('followed');
                res.status(200).json({ status: 'success', action: 'followed', message: 'followed successfully' });
            }
            else {
                //remove from user following list
                const user = yield userSchema_1.default.findOne({ _id: userId });
                const followingIndex = user === null || user === void 0 ? void 0 : user.followings.findIndex((element) => element == createrId);
                user === null || user === void 0 ? void 0 : user.followings.splice(followingIndex, 1);
                yield (user === null || user === void 0 ? void 0 : user.save());
                //remove from creater followers list
                const creater = yield userSchema_1.default.findOne({ _id: createrId });
                const followersIndex = creater === null || creater === void 0 ? void 0 : creater.followers.findIndex((element) => element == userId);
                creater === null || creater === void 0 ? void 0 : creater.followers.splice(followersIndex, 1);
                yield (creater === null || creater === void 0 ? void 0 : creater.save());
                console.log('unfollowed');
                res.status(200).json({ status: 'success', action: 'UnFollowed', message: 'UnFollowed successfully' });
            }
        }
        else {
            res.json({ status: false, message: 'oops! Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.userFollowAndUnFollow = userFollowAndUnFollow;
const uploadPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { postImg, caption } = req.body;
        if (postImg || caption) {
            const doc = new postsSchema_1.default({
                userId: userId,
                post: postImg || null,
                caption: caption || null,
            });
            yield doc.save();
            res.status(200).json({ status: true, message: 'post uploaded successfully' });
        }
        else {
            res.json({ status: false, message: 'Oops! Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.uploadPosts = uploadPosts;
//---> Get User Feeds <---//
const getUserFeeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.query.username;
        if (username) {
            const user = yield userSchema_1.default.findOne({ username });
            const userId = user === null || user === void 0 ? void 0 : user._id;
            const feeds = yield postsSchema_1.default.find({ userId }).sort({ createdAt: -1 }).populate('userId');
            res.status(200).json({ status: true, data: feeds, message: 'success' });
        }
        else {
            res.json({ status: false, message: 'Oops! Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.getUserFeeds = getUserFeeds;
const getAllFeeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feeds = yield postsSchema_1.default.find().sort({ createdAt: -1 }).populate('userId');
        if (feeds) {
            res.status(200).json({ status: true, data: feeds, message: 'success' });
        }
        else {
            res.json({ status: false, message: 'Oops! Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.getAllFeeds = getAllFeeds;
const removePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.query.id;
        console.log(postId);
        if (postId) {
            yield postsSchema_1.default.findByIdAndRemove({ _id: postId });
            res.status(200).json({ status: true, message: 'post deleted successfully' });
        }
        else {
            res.json({ status: false, message: 'deletion failed! Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.removePost = removePost;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, changes } = req.body;
        if (id && changes) {
            yield postsSchema_1.default.findByIdAndUpdate({ _id: id }, { caption: changes });
            res.status(200).json({ status: true, message: 'Edit post successfull' });
        }
        else {
            res.json({ status: false, message: 'Oops! Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.editPost = editPost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.body.postId;
        const userId = req.userId;
        const post = yield postsSchema_1.default.findById(postId);
        let likeObj = {
            userId: userId,
        };
        let likeExist = post === null || post === void 0 ? void 0 : post.like.some((data) => data.userId == userId);
        if (!likeExist) {
            const post = yield postsSchema_1.default.findOne({ _id: postId });
            post === null || post === void 0 ? void 0 : post.like.push(likeObj);
            post === null || post === void 0 ? void 0 : post.save().then((response) => {
                res.status(200).json({ status: true, action: 'liked', message: 'like added successfully' });
            });
        }
        else {
            const existLike = yield postsSchema_1.default.findOne({ _id: postId });
            const index = existLike === null || existLike === void 0 ? void 0 : existLike.like.findIndex((element) => element.userId == userId);
            console.log(index);
            existLike === null || existLike === void 0 ? void 0 : existLike.like.splice(index, 1);
            yield (existLike === null || existLike === void 0 ? void 0 : existLike.save());
            res.status(200).json({ status: true, action: 'unliked', message: 'unliked successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.likePost = likePost;
const reportPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        console.log(req.body, '------------');
        const { postId, suggestion } = req.body;
        if (postId && suggestion) {
            const existReport = yield reportsSchema_1.default.findOne({ userId: userId }, { postId: postId });
            console.log(existReport, '------');
            if (!existReport) {
                const doc = new reportsSchema_1.default({
                    userId,
                    postId,
                    reason: suggestion
                });
                yield doc.save().then((response) => {
                    res.status(200).json({ status: true, message: 'Your report has been submitted' });
                });
            }
            else {
                res.json({ status: false, message: 'You already have a report' });
            }
        }
        else {
            res.json({ status: false, message: 'failed' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.reportPost = reportPost;
const getPostComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.query.id;
        if (postId) {
            const comments = yield commentsSchema_1.default.find({ postId }).populate('userId');
            res.status(200).json({ status: true, data: comments, message: 'success' });
        }
        else {
            res.json({ status: false, message: 'failed to find comments' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.getPostComments = getPostComments;
const commentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.body.postId;
        const userId = req.userId;
        const comment = req.body.comment;
        if (postId && userId && comment) {
            const doc = new commentsSchema_1.default({
                userId: userId,
                postId: postId,
                comment: comment
            });
            yield doc.save();
            res.status(200).json({ status: true, message: 'comment added' });
        }
        else {
            res.json({ status: false, message: 'something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.commentPost = commentPost;
const commentsLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const commentId = req.body.commentId;
        const comment = yield commentsSchema_1.default.findById(commentId);
        let likeObj = {
            userId: userId,
        };
        let likeExist = comment === null || comment === void 0 ? void 0 : comment.likes.some((data) => data.userId == userId);
        console.log(likeExist);
        if (!likeExist) {
            const comment = yield commentsSchema_1.default.findOne({ _id: commentId });
            comment === null || comment === void 0 ? void 0 : comment.likes.push(likeObj);
            comment === null || comment === void 0 ? void 0 : comment.save().then((response) => {
                res.status(200).json({ status: true, action: 'liked', message: 'like added successfully' });
            });
        }
        else {
            const existLike = yield commentsSchema_1.default.findOne({ _id: commentId });
            const index = existLike === null || existLike === void 0 ? void 0 : existLike.likes.findIndex((element) => element.userId == userId);
            existLike === null || existLike === void 0 ? void 0 : existLike.likes.splice(index, 1);
            yield (existLike === null || existLike === void 0 ? void 0 : existLike.save().then((response) => {
                console.log(response, 'unlike');
                res.status(200).json({ status: true, action: 'unliked', message: 'unliked successfully' });
            }));
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.commentsLikes = commentsLikes;
const deleteComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.query.commentId;
        if (commentId) {
            yield commentsSchema_1.default.findByIdAndRemove({ _id: commentId });
            res.status(200).json({ status: true, message: 'comment deleted successfully' });
        }
        else {
            res.json({ status: false, message: 'comment not found' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.deleteComments = deleteComments;
const getAllCreaters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creaters = yield userSchema_1.default.find({ creator: true });
        if (creaters) {
            res.status(200).json({ status: true, data: creaters, message: 'success' });
        }
        else {
            res.json({ status: false, message: 'creaters not found' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.getAllCreaters = getAllCreaters;
const searchCreaters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.explore;
        console.log(search);
        const data = yield userSchema_1.default.find({ username: { $regex: search }, creator: true });
        if (data) {
            res.status(200).json({ status: true, data: data, message: 'success' });
        }
        else {
            res.json({ status: false, message: 'creaters not found' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server' });
    }
});
exports.searchCreaters = searchCreaters;
const integrateBankAcc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        console.log(userId);
        const { name, accountNo, Ifsc, branch, transactionId } = req.body;
        if (name && accountNo && Ifsc && branch) {
            const doc = new BankSchema_1.default({
                userId: userId,
                Fullname: name,
                AccountNumber: accountNo,
                IFSC: Ifsc,
                Branch: branch,
                TransactionId: transactionId || null
            });
            doc.save();
            res.status(200).json({ status: true, message: 'integration success' });
        }
        else {
            res.json({ status: false, message: 'integration error' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.integrateBankAcc = integrateBankAcc;
const editUserBankInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { name, accountNo, Ifsc, branch, transactionId } = req.body;
        console.log(name, accountNo, Ifsc, branch, transactionId);
        if (name && accountNo && Ifsc && branch) {
            yield BankSchema_1.default.findOneAndUpdate({ userId }, {
                Fullname: name,
                AccountNumber: accountNo,
                IFSC: Ifsc,
                Branch: branch,
                TransactionId: transactionId || null
            });
            res.status(200).json({ status: true, message: 'edit successfull' });
        }
        else {
            res.json({ status: false, message: 'process failed' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.editUserBankInfo = editUserBankInfo;
const getUserBankInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (userId) {
            const data = yield BankSchema_1.default.findOne({ userId });
            console.log(data, '------------------');
            if (data) {
                res.status(200).json({ status: true, data: data, message: 'success' });
            }
            else {
                res.json({ status: false, data: null, message: 'failed to find ' });
            }
        }
        else {
            res.json({ status: false, message: 'failed to find ' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.getUserBankInfo = getUserBankInfo;
const ApproveDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.info;
        const creatorId = req.body.creatorId;
        const donorId = req.userId;
        console.log(data, '------------------', creatorId, '===============', donorId);
        const creatorExist = yield donationSchema_1.default.findOne({ userId: creatorId });
        console.log(creatorExist, '---------');
        let object = {
            donorId: donorId,
            amount: data.amount,
            note: data.note
        };
        if (creatorExist) {
            const creator = yield donationSchema_1.default.findOne({ userId: creatorId });
            const amount = (parseInt(creator === null || creator === void 0 ? void 0 : creator.amount) + parseInt(data.amount));
            const donation = yield donationSchema_1.default.findOneAndUpdate({ userId: creatorId }, { amount: amount });
            donation === null || donation === void 0 ? void 0 : donation.donators.push(object);
            yield (donation === null || donation === void 0 ? void 0 : donation.save().then((response) => {
                res.status(200).json({ status: true, message: 'Your donation is successfull' });
            }));
        }
        else {
            let doc = {
                userId: creatorId,
                amount: data.amount,
                donators: [object]
            };
            yield donationSchema_1.default.create(doc).then((response) => {
                res.status(200).json({ status: true, message: 'Your donation is successfull' });
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.ApproveDonation = ApproveDonation;
const getUserWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const userWallet = yield donationSchema_1.default.findOne({ userId: userId }).populate('donators.donorId');
        if (!userWallet) {
            res.json({ status: false, message: 'user dont have wallet' });
        }
        res.status(200).json({ status: true, data: userWallet, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.getUserWallet = getUserWallet;
const getUserDatas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('0000000000000000000000');
        const userId = req.query.id;
        console.log(userId);
        const user = yield userSchema_1.default.findById(userId);
        console.log(user, "?>>>>>>");
        res.status(200).json({ status: true, data: user, message: 'okkkkkk' });
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.getUserDatas = getUserDatas;
//---> PayOuts <---//
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('running a task every minute');
    const donations = yield donationSchema_1.default.find();
    donations.forEach((element, index, array) => __awaiter(void 0, void 0, void 0, function* () {
        const lastPayment = element.updatedAt;
        const currentDate = new Date();
        const diffTime = Math.abs(Number(currentDate) - Number(lastPayment));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 7 && (element === null || element === void 0 ? void 0 : element.amount) !== 0) {
            console.log(element.userId);
            const amount = element.amount;
            let doc = new payoutsSchema_1.default({
                userId: element.userId,
                amount: element.amount
            });
            yield doc.save();
            const id = element.userId.toString();
            console.log(id);
            yield donationSchema_1.default.findOneAndUpdate({ userId: id }, {
                amount: 0
            });
        }
    }));
}));
const getPayouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.id;
        const payouts = yield payoutsSchema_1.default.find({ userId: userId });
        payouts ? res.status(200).json({ status: true, data: payouts, message: 'success' })
            : res.json({ status: false, message: 'User not found' });
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'internal server error' });
    }
});
exports.getPayouts = getPayouts;
//---> Get User Datas <---//
const getDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const userData = yield userSchema_1.default.findById(userId).populate(['followers', 'followings']);
        console.log(userData);
        if (userData) {
            res.json({
                'userId': userData._id,
                'email': userData.email,
                'name': userData.name,
                'username': userData.username,
                'about': userData.about,
                'socialLink': userData.socialLink,
                'profile': userData.profile,
                'coverImage': userData.coverImage,
                'category': userData.category,
                'followers': userData.followers,
                'followings': userData.followings,
                'isVerified': userData.isVerified,
                'isBanned': userData.isBanned,
                'creator': userData.creator,
                'disabled': userData.disabled,
                'isAuthenticated': true
            });
        }
        else {
            res.json({ status: false, data: undefined, message: 'User not found' });
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error.";
        res.json({ status: false, message: message });
    }
});
exports.getDetails = getDetails;
