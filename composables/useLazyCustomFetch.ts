import { defu } from 'defu'
import type { UseFetchOptions } from '#app'
import type { UseLazyFetchParams } from '~/app/types/common';

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
