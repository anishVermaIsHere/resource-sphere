
export function getAuthStorage(key="_au"){
    if(typeof window !== 'undefined'){
        try {
            const storageData = localStorage.getItem(key);
            if(!storageData) return {};
            const parsedData = JSON.parse(storageData);
            return parsedData?.state ?? {};
        } catch (error) {
            console.error("Failed to parse auth storage:", error);
            return {}
        }
    }
    return {}
}