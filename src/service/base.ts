import { asyncRunSafe } from "@/utils"
import { base } from "./fetch"

export type IOtherOptions = {
  bodyStringify?: boolean
  needAllResponseContent?: boolean
}

const baseFetch = base
export const request = async<T>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  try {
    const otherOptionsForBaseFetch = otherOptions || {}
    const [err, resp] = await asyncRunSafe<T>(baseFetch(url, options, otherOptionsForBaseFetch))
    if (err === null) {
      return resp
    }
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export const post = <T>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request<T>(url, Object.assign({}, options, { method: "POST" }), otherOptions)
}

export const get = <T>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request<T>(url, Object.assign({}, options, { method: "GET" }), otherOptions)
}