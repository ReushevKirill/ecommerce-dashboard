import { defu } from 'defu'
import type { NitroFetchRequest } from 'nitropack'
import type { ReqOptionsType } from '~/app/types/common'

export function useServerFetch<T>(url: NitroFetchRequest, opts: ReqOptionsType = {}) {
  const config = useAppConfig()

  const defaults: ReqOptionsType = {
    baseURL: config.api.baseURL ?? 'https://dummyjson.com'
  }

  const params = defu(opts, defaults)

  return $fetch<T>(url, params)
}