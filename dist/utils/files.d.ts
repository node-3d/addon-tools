export declare const copy: (src: string, dest: string) => Promise<void>;
export declare const exists: (name: string) => Promise<boolean>;
export declare const ensuredir: (dir: string) => Promise<void>;
export declare const subdirs: (name: string) => Promise<string[]>;
export declare const subfiles: (name: string) => Promise<string[]>;
export declare const traverse: (name: string, showDirs?: boolean) => Promise<string[]>;
export declare const rmdir: (name: string) => Promise<void>;
export declare const rm: (name: string) => Promise<void>;
