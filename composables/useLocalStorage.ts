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

	function _setItemBase<T>(key: string) {
		return (value: string) => {
			return setItem(key, value) as T
		}
	}

	function _getItemBase<T>(key: string) {
		return () => {
			return getItem(key) as T
		}
	}

	function _parseBase<T>(key: string) {
		return () => {
			return parse(key) as T
		}
	}

	return {
		getItem,
		setItem,
		parse,
		_getItemBase,
		_setItemBase,
		_parseBase,
	}
}
