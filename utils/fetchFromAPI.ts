
export default async function(endpoint: string, options: object): Promise<any> {
    const {api: {baseURL}} = useAppConfig()
    return await $fetch(endpoint, {baseURL, ...options})
}