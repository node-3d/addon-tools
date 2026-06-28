global.AddonTools ??= {};
const loggers = {};
const levels = [
    null,
    'error',
    'warn',
    'info',
    'log',
    'debug'
];
let currentLevel = 'log';
const levelIdx = {};
for(let i = 0; i < levels.length; i++)levelIdx[levels[i] ?? 'null'] = i;
const wrapOutput = (outputFn, level)=>(...args)=>{
        const outputLevel = levelIdx[level] ?? 0;
        const activeLevel = levelIdx[currentLevel ?? 'null'] ?? 0;
        if (outputLevel > activeLevel) return;
        outputFn(...args);
    };
const isLoggerLevel = (value)=>'error' === value || 'warn' === value || 'info' === value || 'log' === value || 'debug' === value;
const assignMethods = (logger, methods)=>{
    for (const [k, v] of Object.entries(methods))if (isLoggerLevel(k) && v) logger.replace(k, v);
};
const createLogger = (opts)=>{
    const prev = loggers[opts.name];
    if (prev) {
        assignMethods(prev, opts);
        return prev;
    }
    const newLogger = {
        debug: console.debug,
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error,
        replace: (level, fn)=>{
            if (levelIdx[level]) newLogger[level] = wrapOutput(fn || console.log, level);
        }
    };
    assignMethods(newLogger, opts);
    loggers[opts.name] = newLogger;
    return newLogger;
};
const setLevel = (levelOrNull)=>{
    if (levels.includes(levelOrNull)) currentLevel = levelOrNull;
};
const getLevel = ()=>currentLevel;
const getLoggers = ()=>({
        ...loggers
    });
const getLogger = (name)=>loggers[name] || createLogger({
        name
    });
if (!global.AddonTools.log) global.AddonTools.log = (name, level, ...args)=>{
    const logger = loggers[name];
    if (!logger) return;
    logger[level](...args);
};
createLogger({
    name: 'addon-tools'
});
export { createLogger, getLevel, getLogger, getLoggers, setLevel };
