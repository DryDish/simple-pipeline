import { error } from "./logger.js";
import { exit } from "shelljs";

const folderNameLength: number = "hook-server".length;
const hookIndex: number = __dirname.lastIndexOf("hook-server") + folderNameLength;

const SERVER_ROOT: string = __dirname.slice(0, hookIndex);

if (!SERVER_ROOT.includes("hook-server")) {
	error("Critical ENVs not set, aborting!");
	error(`SERVER_ROOT was set to: '${SERVER_ROOT}'`);
	exit(1);
}

export { SERVER_ROOT };
