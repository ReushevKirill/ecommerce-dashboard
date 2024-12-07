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

    return {
        getItem,
        setItem
    }
}