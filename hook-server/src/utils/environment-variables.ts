import { error } from "./logger.js";
import { exit } from "shelljs";

const SYSTEM_USER = process.env.USER;

const folderNameLength = "hook-server".length;
const hookIndex = __dirname.lastIndexOf("hook-server") + folderNameLength;

const SERVER_ROOT = __dirname.slice(0, hookIndex);

if (SERVER_ROOT == undefined || SYSTEM_USER == undefined) {
	error("Critical ENVs not set, aborting!");
	error(`SERVER_ROOT was set to: '${SERVER_ROOT}'`);
	exit(1);
}

export { SERVER_ROOT, SYSTEM_USER };
