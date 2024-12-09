export const useLocalStorage = () => {

    function getItem(key: string) {
        try {
            return localStorage.getItem(key)
        } catch (e) {
            console.error(e)
        }
    }

    function setItem(key: string, value: string) {
        try {
            return localStorage.setItem(key, value)
        } catch (e) {
            console.error(e)
        }
    }

    function parse(key: string) {
        try {
            if (!getItem(key)) return undefined
            return JSON.parse(getItem(key)!)
        } catch (e) {
            console.log(e)
        }
    }
    
    function _setItemBase(key: string) {
        return (value: any) => {
            return setItem(key, value)
        }
    }

    function _getItemBase(key: string) {
        return () => {
            return getItem(key)
        }
    }

    function _parseBase(key: string) {
        return () => {
            return parse(key)
        }
    }

    return {
        getItem,
        setItem,
        parse,
        _getItemBase,
        _setItemBase,
        _parseBase
    }
}