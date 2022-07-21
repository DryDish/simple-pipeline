#!/usr/bin/node

// import './utils/environment-variables'
import express, { Express, Request, Response } from "express";
import { ipLogger } from "./middleware/logger-middleware";
import { githubRouter } from "./routes/github.routes";
import { info, error } from "./utils/logger";

const app: Express = express();
const port: number = 8080;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
// Log incoming request's IP address
app.use(ipLogger);

// Default
app.get("/", (_req: Request, res: Response) => {
	info(`Incoming default request, responding`);
	res.status(200).json({ message: "Hello, world!" });
});

// Router for GitHub endpoint
app.use("/github", githubRouter);

// Invalid URL - default
app.all("*", (req: Request, res: Response) => {
	error(`Invalid request: ${req.url}`);
	res.status(404).json({ err: 404, description: "Invalid URL" });
});

// Start server on given port
app.listen(port, () => {
	info(`Server is running on port: ${port}`);
});
