import { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
export declare function authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=authenticateUser.d.ts.map