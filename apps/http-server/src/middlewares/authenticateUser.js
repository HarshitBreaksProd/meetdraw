"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = authenticateUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function authenticateUser(req, res, next) {
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
        if (!verified?.id) {
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
}
