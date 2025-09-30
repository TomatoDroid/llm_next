import { asyncRunSafe } from "@/utils"
import { base } from "./fetch"

export type IOtherOptions = {
  bodyStringify?: boolean
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
  }
}

export const post = <T>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request<T>(url, Object.assign({}, options, { method: "POST" }), otherOptions)
}