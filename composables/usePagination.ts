type UsePaginationOptions = {
	initialPage?: number
	limit: number
  maxPagesShown?: number
}

export function usePagination(opts: UsePaginationOptions) {
  const currentPage = ref(opts.initialPage ?? 1);
  const limit = ref(opts.limit ?? 10);
  const maxPagesShown = ref(opts.maxPagesShown ?? 5);

  const skipped = computed(() => {
		return (currentPage.value - 1) * limit.value
	})

  return {
    skipped,
    currentPage,
    limit,
    maxPagesShown,
    setLimit: (newLimit: number) => limit.value = newLimit, 
    setPage: (newPage: number) => currentPage.value = newPage,
    setMaxPagesShown: (newValue: number) => maxPagesShown.value = newValue,
  }
}
