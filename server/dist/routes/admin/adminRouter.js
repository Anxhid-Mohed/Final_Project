"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../../controller/adminController");
const router = express_1.default.Router();
router.post('/signin', adminController_1.adminSignin);
router.get('/users', adminController_1.usersList);
router.patch('/block', adminController_1.usersBlockings);
router.patch('/unblock', adminController_1.usersUnBlockings);
router.get('/requests', adminController_1.requestsList);
router.patch('/approve', adminController_1.requestsApproval);
router.delete('/reject', adminController_1.requestsRejection);
router.get('/report', adminController_1.reportsList);
router.get('/view', adminController_1.postView);
router.delete('/remove', adminController_1.removeReportedPost);
exports.default = router;
