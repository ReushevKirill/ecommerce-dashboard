import { useCategoriesStore } from '~/store/categoriesStore'

export const useCategories = () => {
	const categoriesStore = useCategoriesStore()
  const { categories, isLoading, error } = storeToRefs(categoriesStore)

  function renderCatPagePath(slug: string) {
    return `/category/${slug}`
  }

  return {
    categories,
    catsIsLoading: isLoading,
    catsError: error,
    renderCatPagePath
  }
}