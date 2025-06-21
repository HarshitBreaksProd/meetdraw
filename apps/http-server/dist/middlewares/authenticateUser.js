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
exports.authenticateUser = authenticateUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = req.cookies["jwt"];
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }
        if (!token) {
            res.status(401).json({
                message: "The user is not logged in",
            });
            return;
        }
        try {
            const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr");
            if (!(verified === null || verified === void 0 ? void 0 : verified.id)) {
                res.status(401).json({
                    message: "User not registered, Invalid token",
                });
                return;
            }
            req.userId = verified.id;
            next();
        }
        catch (error) {
            res.status(401).json({
                message: "Invalid token",
            });
        }
    });
}
