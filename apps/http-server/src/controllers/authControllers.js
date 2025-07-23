"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = signupController;
exports.signinController = signinController;
exports.signoutController = signoutController;
exports.infoController = infoController;
const client_1 = __importDefault(require("@workspace/db/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("@workspace/common");
async function signupController(req, res) {
    const inputValidator = common_1.UserSignupSchema;
    const validatedInput = inputValidator.safeParse(req.body);
    if (validatedInput.error) {
        res.status(404).json({
            message: "Invalid Inputs",
        });
        return;
    }
    try {
        const saltrounds = parseInt(process.env.SALTROUNDS || "10");
        const hashedPwd = await bcrypt_1.default.hash(validatedInput.data.password, saltrounds);
        const userCreated = await client_1.default.user.create({
            data: {
                username: validatedInput.data.username,
                password: hashedPwd,
                name: validatedInput.data.name,
            },
        });
        const user = {
            id: userCreated.id,
            username: userCreated.username,
            name: userCreated.name,
            photo: userCreated.photo,
        };
        const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr");
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "User Signed Up",
            user,
            token,
        });
        return;
    }
    catch (e) {
        console.log(e);
        const code = e.code;
        if (code === "P2002") {
            res.status(401).json({
                message: "Username already exists",
            });
        }
        res.status(401).json({
            message: "Error faced while creating user, try again",
        });
    }
}
async function signinController(req, res) {
    const inputValidator = common_1.UserSigninSchema;
    const validatedInput = inputValidator.safeParse(req.body);
    if (validatedInput.error) {
        res.status(404).json({
            message: "Invalid Inputs",
        });
        return;
    }
    try {
        const userFound = await client_1.default.user.findFirst({
            where: {
                username: validatedInput.data.username,
            },
        });
        if (!userFound) {
            res.status(404).json({
                message: "The username does not exist",
            });
            return;
        }
        const validatedPassword = await bcrypt_1.default.compare(validatedInput.data.password, userFound.password);
        if (!validatedPassword) {
            res.status(404).json({
                message: "The password is incorrect",
            });
            return;
        }
        const user = {
            id: userFound.id,
            username: userFound.username,
            name: userFound.name,
            photo: userFound.photo,
        };
        const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr");
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "User Signed In",
            user: user,
            token,
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(401).json({
            message: "Error faced while loging user in, try again",
        });
    }
}
async function signoutController(req, res) {
    res.clearCookie("jwt");
    res.json({
        message: "User logged out",
    });
}
async function infoController(req, res) {
    const userId = req.userId;
    try {
        const userFound = await client_1.default.user.findUnique({
            where: {
                id: userId,
            },
        });
        const user = {
            id: userFound?.id,
            username: userFound?.username,
            name: userFound?.name,
        };
        res.status(200).json({
            message: "User info",
            user,
        });
    }
    catch (e) {
        console.log(e);
        res.status(401).json({
            message: "Error faced while getting user info, try again",
        });
    }
}
