
export type $FetchType = typeof $fetch
export type UseLazyFetchParams = Parameters<typeof useLazyFetch>;
export type ReqOptionsType = Parameters<$FetchType>[1]
export type AwesomePaginationProps = {
  totalItems: number,
  itemsPerPage?: number,
  showEndingButtons?: boolean,
  maxPagesShown?: number,
  dir?: "ltr" | "rtl",
  type?: "button" | "link",
  linkUrl?: string,
  locale?: "en" | "ar" | "ir",
  prevButtonContent?: string,
  nextButtonContent?: string,
  hidePrevNext?: boolean,
  hidePrevNextWhenEnds?: boolean,
  disablePagination?: boolean,
  showBreakpointButtons?: boolean,
}
