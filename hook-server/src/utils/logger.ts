/**
 * Simple wrapper to `console.log` that appends a date and time
 * in the format of `[yyyy-MM-dd HH:mm:ss]` and a green colored `[INFO]` block
 * to any passed text
 * @param {*} text
 * @example const country = 'Denmark';
logger.info(`User has connected from ${country}`);
// output: [2022-03-26 15:59:33] [INFO] User has connected from Denmark

logger.info("We are live!");
// output: [2022-03-26 16:02:12] [INFO] We are Live!
 */
const info = (text: unknown): void => {
	const type: string = colorText(colors.fg.green, " [INFO]");
	const time: string = formatDateTime();
	console.log(`${time}${type} ${text}`);
};

/**
 * Simple wrapper to `console.warn` that appends a date and time
 * in the format of `[yyyy-MM-dd HH:mm:ss]` and a yellow colored `[WARN]` block
 * to any passed text
 * @param {*} text
 * @example
 * logger.warn("Timeout, retrying 1/3");
 * // output: [2022-03-26 15:59:33] [WARN] Timeout, retrying 1/3
 */
const warn = (text: unknown): void => {
	const type: string = colorText(colors.fg.yellow, " [WARN]");
	const time: string = formatDateTime();
	console.warn(`${time}${type} ${text}`);
};

/**
 * Simple wrapper to `console.error` that appends a date and time
 * in the format of `[yyyy-MM-dd HH:mm:ss]` and a red colored `[ERROR]` block
 * to any passed text
 * @param {*} text
 * @example logger.error("Something went wrong!");
// output: [2022-03-26 15:59:33][ERROR] Something went wrong!
 */
const error = (text: unknown) => {
	const type: string = colorText(colors.fg.red, "[ERROR]");
	const time: string = formatDateTime();
	console.error(`${time}${type} ${text}`);
};

/**
 * Formats the current date and time according to: `yyyy-MM-dd HH:mm:ss` and
 * puts it inside square brackets
 *
 * @returns {string} Formatted current time inside square brackets
 *
 * @example
 * const time = formatDateTime();
 * console.log(time);
 * // output: [2022-03-26 15:59:33]
 */
const formatDateTime = (): string => {
	// Date time in format of 2022-03-26T15:59:33.12311
	const current_date_time: string = new Date().toISOString();
	// Take on the date part of time: eg 2022-03-26
	const date: string = current_date_time.split("T")[0];
	// Take only the time part of time, discarding ms: eg 15:59:33
	const time: string = current_date_time.split("T")[1].split(".")[0];
	return `[${date} ${time}]`;
};

/**
 * Returns the given `text` wrapped inside code that will display that text in color in supported terminals
 *
 * @param {*} color
 * @param {*} text
 * @returns {string} The text wrapped in code to display it in color
 *
 * @example
 * colorText(colors.fg.red, "[ERROR]");
 * // Returns: "\x1b[31m [ERROR] \x1b[0m"
 * // In a supported terminal this will show it as red [ERROR]
 *
 * // the colors object can be found on https://simplernerd.com/js-console-colors/
 */
const colorText = (color: String, text: String): string => {
	return `${color}${text}${colors.reset}`;
};

// Simple object to store many useful colors for text wrapping
// From: https://simplernerd.com/js-console-colors/
const colors = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	underscore: "\x1b[4m",
	blink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m",
	// Foreground (text) colors
	fg: {
		black: "\x1b[30m",
		red: "\x1b[31m",
		green: "\x1b[32m",
		yellow: "\x1b[33m",
		blue: "\x1b[34m",
		magenta: "\x1b[35m",
		cyan: "\x1b[36m",
		white: "\x1b[37m",
		crimson: "\x1b[38m",
	},
	// Background colors
	bg: {
		black: "\x1b[40m",
		red: "\x1b[41m",
		green: "\x1b[42m",
		yellow: "\x1b[43m",
		blue: "\x1b[44m",
		magenta: "\x1b[45m",
		cyan: "\x1b[46m",
		white: "\x1b[47m",
		crimson: "\x1b[48m",
	},
};

export { warn, info, error };
