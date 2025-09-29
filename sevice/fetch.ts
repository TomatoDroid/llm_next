import ky, { AfterResponseHook, Hooks } from "ky"
import { IOtherOptions } from "./base"

export type FetchOptionType = Omit<RequestInit, "body"> & {
  params?: Record<string, any>
  body?: BodyInit | Record<string, any> | null
}

export const ContentType = {
  json: 'application/json',
  stream: 'text/event-stream',
  audio: 'audio/mpeg',
  form: 'application/x-www-form-urlencoded; charset=UTF-8',
  download: 'application/octet-stream', // for download
  downloadZip: 'application/zip', // for download
  upload: 'multipart/form-data', // for upload
}
const afterResponse204: AfterResponseHook = (_request, _options, response) => {
  if (response.status === 204) return Response.json({ result: 'success' })
}

const baseHooks: Hooks = {
  afterResponse: [
    afterResponse204
  ]
}

const baseClient = ky.create({
  hooks: baseHooks,
  timeout: 100000
})

export const baseOptions: RequestInit = {
  method: "GET",
  mode: "cors",
  credentials: "include",
  headers: new Headers({
    "Content-Type": ContentType.json
  }),
  redirect: "follow",
}
export const base = async<T>(url: string, options: FetchOptionType = {}, otherOptions: IOtherOptions = {}): Promise<T> => {
  const { params, body, headers, ...init } = Object.assign({}, baseOptions, options)
  const { bodyStringify = true } = otherOptions

  const fetchPathname = url.startsWith("/") ? url : `/${url}`

  const client = baseClient.extend({
    hooks: {
      ...baseHooks,
      beforeError: [],
      beforeRequest: [],
      afterResponse: [],
    }
  })
  const res = await client(fetchPathname, {
    ...init,
    headers,
    credentials: "include",
    retry: {
      methods: []
    },
    ...(bodyStringify ? { json: body } : { body: body as BodyInit }),
    searchParams: params,
    fetch(resource: RequestInfo | URL, options?: RequestInit) {
      return globalThis.fetch(resource, options)
    }
  })
  return await res.json() as T
}