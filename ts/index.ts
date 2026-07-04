type IndexAddonToolsGlobal = {
	log?: (name: string, level: string, ...args: unknown[]) => void;
};

(
	globalThis as typeof globalThis & {
		AddonTools?: IndexAddonToolsGlobal;
	}
).AddonTools ??= {};

export * from './include.ts';
export * from './utils/index.ts';
