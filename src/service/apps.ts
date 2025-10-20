import { AppListResponse } from "@/app/models/app";
import { Fetcher } from "swr";
import { get } from "./base";

export const fetchAppList: Fetcher<AppListResponse, { url: string; params?: Record<string, any> }> = ({ url, params }) => {
  return get<AppListResponse>(url, { params }) as Promise<AppListResponse>;
}