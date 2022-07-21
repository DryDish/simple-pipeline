import { SERVER_ROOT } from "./environment-variables";
import shell, { ShellString } from "shelljs";
import { error, warn, info } from "./logger.js";

/**
 * Clones the GitHub repository to a folder named `git` in the project root
 * @param {*} repoUrl
 *
 * @returns {number} The return code of the operation
 */
const gitClone = (repoUrl: string): number => {
	info(`Cloning repository...`);

	// Make the git folder, if it does not exist
	shell.mkdir("-p", `${SERVER_ROOT}/git`);

	// Enter it
	shell.cd(`${SERVER_ROOT}/git`);

	// Begin cloning
	const execResult: ShellString = shell.exec(`git clone ${repoUrl}`);

	if (execResult.code === 0) {
		info("Clone was successful");
		return 0;
	} else {
		error("Clone failed!");
		error(`exec return code: ${execResult.code}`);
		return 1;
	}
};

/**
 * Copies the local scripts to the cloned repository
 *
 * @returns {number} The return code of the operation
 */
const copyScripts = (): number => {
	info("Copying scripts folder to clone dir...");

	// Enter root directory
	shell.cd(`${SERVER_ROOT}`);

	// Copy the scripts folder from the root directory to the repository directory
	const result: ShellString = shell.cp("-rf", "scripts/", `${SERVER_ROOT}/git/assignment-tests-mandatory`);

	if (result.code === 0) {
		info("Copy was successful");
		return 0;
	} else {
		error("Failed to copy scripts folder!");
		return 1;
	}
};

/**
 * Executes the build script stored in the `scripts` folder
 *
 * @returns {number} The return code of the operation
 */
const runBuildScript = (): number => {
	shell.cd(`${SERVER_ROOT}/git/assignment-tests-mandatory`);
	const result: ShellString = shell.exec(
		`${SERVER_ROOT}/git/assignment-tests-mandatory/scripts/build_script_with_logs.sh`
	);

	if (result.code === 0) {
		info("Build script ran successfully, images updated.");
		return 0;
	} else if (result.code === 1) {
		warn("Build action failed! Tests did not pass!");
		return 1;
	} else if (result.code === 2) {
		warn("Build action failed! Login to DockerHub failed!");
		return 2;
	} else if (result.code === 3) {
		warn("Build action failed! Images failed to upload!");
		return 3;
	} else {
		error(`Unknown error occurred: Error code: ${result.code}`);
		return result.code;
	}
};

/**
 * Removes the pulled repository from the `git` folder
 *
 * @returns {number} The return code of the operation
 */
const cleanupDirs = (): number => {
	shell.cd(SERVER_ROOT);
	const rm_status: ShellString = shell.rm("-rf", `${SERVER_ROOT}/git/assignment-tests-mandatory`);

	if (rm_status.code === 0) {
		info("Cleaned up git directory");
		return 0;
	} else {
		warn("Cleaning up directory failed!");
		return 1;
	}
};

export { gitClone, copyScripts, runBuildScript, cleanupDirs };
