"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./generated/prisma/index.js");
const globalForPrisma = global;
const client = globalForPrisma.client || new index_js_1.PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.client = client;
exports.default = client;
