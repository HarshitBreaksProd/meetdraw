"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const roomRouter_1 = __importDefault(require("./routes/roomRouter"));
const contentRouter_1 = __importDefault(require("./routes/contentRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
}));
app.use("/api/v1/auth", authRouter_1.default);
app.use("/api/v1/room", roomRouter_1.default);
app.use("/api/v1/content", contentRouter_1.default);
app.listen(parseInt(process.env.PORT || "3001"), () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
