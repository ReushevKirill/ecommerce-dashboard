import type { UseFetchOptions } from '#app'
import { defu } from 'defu'
import type { NitroFetchRequest } from 'nitropack'

export function useCustomFetch<T>(
	url: NitroFetchRequest,
	opts: UseFetchOptions<T> = {},
) {
	const config = useAppConfig()

	const defaults: UseFetchOptions<T> = {
		baseURL: config.api.baseURL ?? 'https://dummyjson.com',
	}

	const params = defu(opts, defaults)

	return useFetch(url, params)
}
