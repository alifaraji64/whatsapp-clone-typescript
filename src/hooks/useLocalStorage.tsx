import { useEffect, useState } from "react";
const PREFIX: string = 'WHATSAPP-CLONE-';

function useLocalStorage(key: string, initialValue: any) {
    const prefixedKey: string = PREFIX + key;

    const [value, setValue] = useState<any>(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if(jsonValue !== 'undefined' && jsonValue !== null){
            return JSON.parse(jsonValue);
        }
        return initialValue;
    })

    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    },[prefixedKey, setValue])

    return [value, setValue] as const
}

export default useLocalStorage;