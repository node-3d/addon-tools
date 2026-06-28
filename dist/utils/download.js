const download = async (url)=>{
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status was ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
};
export { download };
