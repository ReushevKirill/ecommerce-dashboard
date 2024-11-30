import type { EndpointsType } from '~/app/types/api'

export default async function(endpoint: EndpointsType) {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.apiBase}/${endpoint}`)
}