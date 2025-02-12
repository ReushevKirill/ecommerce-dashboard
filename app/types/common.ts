import type { VueAwesomePaginate } from 'vue-awesome-paginate'

export type $FetchType = typeof $fetch
export type ReqOptionsType = Parameters<$FetchType>[1]
export type AwesomePaginationProps = InstanceType<typeof VueAwesomePaginate>["$props"]; 
