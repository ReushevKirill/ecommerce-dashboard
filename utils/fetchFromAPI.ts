type $FetchType = typeof $fetch
type ReqOptions = Parameters<$FetchType>[1]

export default async function (
	endpoint: string,
	options: ReqOptions,
): Promise<any> {
	const {
		api: { baseURL },
	} = useAppConfig()
	return await $fetch(endpoint, { baseURL, ...options })
}
