
export default function () {
	const config = useRuntimeConfig()

	// Базовый API URL
	const BASE_URL = config?.public?.apiBase || 'https://fakestoreapi.com'

	// Обертка для запросов
    async function request<T>(
        endpoint: string,
        options?: { method?: string; body?: any }
      ): Promise<T> {
        try {
          const { data, error } = await useFetch<T>(`${BASE_URL}${endpoint}`, {
            method: options?.method || 'GET',
            body: options?.body,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (error.value) throw new Error(error.value.message);
          return data.value! as T;
        } catch (err: any) {
          console.error(`API Error on ${endpoint}:`, err.message);
          throw new Error('Ошибка при запросе данных.');
        }
      }

	return {
        request
    }
}
