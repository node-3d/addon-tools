export const download = async (url: string): Promise<Buffer> => {
	const response = await fetch(url);
	
	if (!response.ok) {
		throw new Error(`Response status was ${response.status}`);
	}
	
	return Buffer.from(await response.arrayBuffer());
};
