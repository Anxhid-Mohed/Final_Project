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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbconnection_1 = __importDefault(require("./config/dbconnection"));
const userRouter_1 = __importDefault(require("./routes/user/userRouter"));
const adminRouter_1 = __importDefault(require("./routes/admin/adminRouter"));
const chatRouter_1 = __importDefault(require("./routes/user/chatRouter"));
const messageRouter_1 = __importDefault(require("./routes/user/messageRouter"));
const cookieParser = require('cookie-parser');
//variables
const port = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;
const app = (0, express_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbconnection_1.default)(String(DATABASE_URL));
}))();
//middlewares
app.use((0, cors_1.default)({
// origin: ['http://localhost:3000'],
// methods:["GET","POST","PATCH","DELETE"],
// credentials:true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
// app.use(cookieParser());
app.use(cookieParser());
//routes
app.use('/api/', userRouter_1.default);
app.use('/api/admin', adminRouter_1.default);
app.use('/api/chat', chatRouter_1.default);
app.use('/api/messages', messageRouter_1.default);
app.listen(port, () => {
    console.log(`server listening at ${port}`);
});
exports.default = app;
