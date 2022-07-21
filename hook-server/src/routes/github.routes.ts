import express, { Request, Response, Router } from "express";
import { cleanupDirs, copyScripts, gitClone, runBuildScript } from "../utils/functions";
import { info, warn, error } from "../utils/logger.js";

const router: Router = express.Router();

// Testing POST endpoint - used to debug and print incoming messages and bodies
router.post("/test", (req: Request, res: Response) => {
	info(`Incoming POST request on default, responding`);
	info(`body:\n${JSON.stringify(req.body, null, 4)}`);
	res.status(200).json({ message: "received", body: req.body });
});

/**
 * Listens for GitHub webhook triggers.
 *
 * GitHub will send a webhook on any push event on the repository to this endpoint.
 * It will read the ref of that message body to check the branch.
 * If the branch is main, it will continue on to test and build the code.
 * If the branch is anything other than main, it will acknowledge the message and do nothing.
 */
router.post("/", (req: Request, res: Response) => {
	info(`Incoming GitHub hook!`);

	if (req.body.ref === "refs/heads/main") {
		const repoUrl: string = req.body.repository.url;

		res.status(200).json({ status: "beginning build", reason: "correct branch" });
		info("This is the right branch, proceeding..");

		// Initialize my return variables
		let clone_result = 1, copy_result = 1, script_result = 1;

		// Clone repository
		clone_result = gitClone(repoUrl);

		// If it succeeded
		if (clone_result === 0) {
			// Copy build scripts and ENVs to clone dir
			copy_result = copyScripts();

			// If copy succeeded
			if (copy_result === 0) {
				// Execute the build script
				script_result = runBuildScript();
			}
		}

		// Delete the cloned dir
		cleanupDirs();

		// If build script succeeded
		if (script_result === 0) {
			info("Build SUCCESS");
		} else {
			error("Build FAILED");
		}
	} else {
		warn(`Wrong branch: ${req.body.ref}`);
		res.status(200).json({ status: "skipped", reason: "not main branch" });
	}
});

export { router as githubRouter };
