// oxlint-disable no-console
type LoggerFn = (...args: unknown[]) => void;
type LoggerLevel = 'error' | 'warn' | 'info' | 'log' | 'debug';
type LoggerLevelOrNull = LoggerLevel | null;
type Logger = Record<LoggerLevel, LoggerFn> & {
	replace: (level: string, fn: LoggerFn) => void;
};
type LoggerOptions = Partial<Record<LoggerLevel, LoggerFn>> & {
	name: string;
};
type AddonToolsGlobal = {
	log?: (name: string, level: LoggerLevel, ...args: unknown[]) => void;
};

declare global {
	var AddonTools: AddonToolsGlobal | undefined;
}

global.AddonTools ??= {};

const loggers: Record<string, Logger> = {};

const levels = [null, 'error', 'warn', 'info', 'log', 'debug'] as const;
let currentLevel: LoggerLevelOrNull = 'log';

const levelIdx: Record<string, number> = {};
for (let i = 0; i < levels.length; i++) {
	levelIdx[levels[i] ?? 'null'] = i;
}

const wrapOutput =
	(outputFn: LoggerFn, level: LoggerLevel) =>
	(...args: unknown[]) => {
		const outputLevel = levelIdx[level] ?? 0;
		const activeLevel = levelIdx[currentLevel ?? 'null'] ?? 0;

		if (outputLevel > activeLevel) {
			return;
		}
		outputFn(...args);
	};

const isLoggerLevel = (value: string): value is LoggerLevel =>
	value === 'error' ||
	value === 'warn' ||
	value === 'info' ||
	value === 'log' ||
	value === 'debug';

const assignMethods = (logger: Logger, methods: Partial<Record<LoggerLevel, LoggerFn>>) => {
	for (const [k, v] of Object.entries(methods)) {
		if (isLoggerLevel(k) && v) {
			logger.replace(k, v);
		}
	}
};

export const createLogger = (opts: LoggerOptions): Logger => {
	const prev = loggers[opts.name];
	if (prev) {
		assignMethods(prev, opts);
		return prev;
	}
	const newLogger: Logger = {
		debug: console.debug,
		log: console.log,
		info: console.info,
		warn: console.warn,
		error: console.error,
		replace: (level: string, fn: LoggerFn) => {
			if (levelIdx[level]) {
				newLogger[level as LoggerLevel] = wrapOutput(
					fn || console.log,
					level as LoggerLevel,
				);
			}
		},
	};
	assignMethods(newLogger, opts);

	loggers[opts.name] = newLogger;

	return newLogger;
};

export const setLevel = (levelOrNull: LoggerLevelOrNull): void => {
	if (levels.includes(levelOrNull)) {
		currentLevel = levelOrNull;
	}
};

export const getLevel = (): LoggerLevelOrNull => currentLevel;

export const getLoggers = (): Record<string, Logger> => ({ ...loggers });

export const getLogger = (name: string): Logger => loggers[name] || createLogger({ name });

if (!global.AddonTools.log) {
	global.AddonTools.log = (name, level, ...args) => {
		const logger = loggers[name];
		if (!logger) {
			return;
		}
		logger[level](...args);
	};
}

createLogger({ name: 'addon-tools' });
