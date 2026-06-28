type TAddonPaths = {
    bin: string;
    include: string;
};
export declare const getPaths: (dir: string) => TAddonPaths;
export declare const getBin: () => string;
export declare const printBin: () => void;
export declare const getPlatform: () => string;
export declare const printPlatform: () => void;
export declare const getInclude: () => string;
export declare const printInclude: () => void;
export {};
