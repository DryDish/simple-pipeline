import { Request, Response, NextFunction } from "express";
import { info } from "../utils/logger";

// Log IP source of incoming message
const ipLogger = (req: Request, _res: Response, next: NextFunction) => {
	info(`Message received from ip: ${req.ip} `);
	next();
};

export { ipLogger };
