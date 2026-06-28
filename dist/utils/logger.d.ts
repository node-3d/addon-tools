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
export declare const createLogger: (opts: LoggerOptions) => Logger;
export declare const setLevel: (levelOrNull: LoggerLevelOrNull) => void;
export declare const getLevel: () => LoggerLevelOrNull;
export declare const getLoggers: () => Record<string, Logger>;
export declare const getLogger: (name: string) => Logger;
export {};
