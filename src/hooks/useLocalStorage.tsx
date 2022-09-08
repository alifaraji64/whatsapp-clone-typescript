import { useEffect, useState } from "react";
const PREFIX: string = 'WHATSAPP-CLONE-';

function useLocalStorage(key: string, initialValue: any) {
    const prefixedKey: string = PREFIX + key;

    const [value, setValue] = useState<any>(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        console.log(jsonValue);
        if (jsonValue !== 'undefined' && jsonValue !== null && jsonValue) {
            console.log(jsonValue);

            return JSON.parse(jsonValue);
        }
        return initialValue;
    })

    useEffect(() => {

        localStorage.setItem(prefixedKey, value == '' ? value : JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue] as const
}

export default useLocalStorage;