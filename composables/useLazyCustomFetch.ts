import { defu } from 'defu'
import type { UseFetchOptions } from '#app'

type UseLazyFetchParams = Parameters<typeof useLazyFetch>;
type UrlType = UseLazyFetchParams[0];

export function useLazyCustomFetch<T>(
	url: UrlType,
	opts: UseFetchOptions<T> = {},
) {
	const config = useAppConfig()

	const defaults: UseFetchOptions<T> = {
		baseURL: config.api.baseURL ?? 'https://dummyjson.com',
	}

	const params = defu(opts, defaults)

	return useLazyFetch(url, params)
}
