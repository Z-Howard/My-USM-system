import { decrypt, encrypt } from "../crypto"

function createLocalStorage() {
	/** 默认缓存期限为7天 */
	const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

	function set<K>(key: K, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
		const storageData = {
			value,
			expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
		}
		const json = encrypt(storageData)
		window.localStorage.setItem(key as string, json)
	}

	function get<K>(key: K) {
		const json = window.localStorage.getItem(key as string)
		if (json) {
			let storageData: null = null
			try {
				storageData = decrypt(json)
			} catch {
				// 防止解析失败
			}
			if (storageData) {
				const { value, expire } = storageData
				// 在有效期内直接返回
				if (expire === null || expire >= Date.now()) {
					return value
				}
			}
			remove(key)
			return null
		}
		return null
	}

	function remove(key: any) {
		window.localStorage.removeItem(key as string)
	}
	function clear() {
		window.localStorage.clear()
	}

	return {
		set,
		get,
		remove,
		clear,
	}
}

export const localStg = createLocalStorage()
