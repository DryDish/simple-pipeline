import "dotenv/config";
import { error} from "./logger.js";
import { exit } from "shelljs";

const SYSTEM_USER = process.env.USER!;

const GIT_REPO_URL = process.env.GIT_REPO_URL!;
const SERVER_ROOT = `/home/${SYSTEM_USER}/hook-server`;

if (GIT_REPO_URL == undefined || SERVER_ROOT === undefined) {
    error("Critical ENVs not set, aborting!");
    error(`GIT_REPO_URL was set to: '${GIT_REPO_URL}'`)
    error(`SERVER_ROOT was set to: '${SERVER_ROOT}'`)
    exit(1);
}

export { GIT_REPO_URL, SERVER_ROOT };
