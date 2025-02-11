type UsePaginationOptions = {
	initialPage: number
	limit: number
}
export function usePagination(opts: UsePaginationOptions) {
  const currentPage = ref(opts.initialPage);
  const limit = ref(opts.limit);
  const skipped = computed(() => {
		return (currentPage.value - 1) * limit.value
	})

  return {
    skipped,
    currentPage,
    limit,
    setLimit: (newLimit: number) => limit.value = newLimit, 
    setPage: (newPage: number) => currentPage.value = newPage
  }
}
