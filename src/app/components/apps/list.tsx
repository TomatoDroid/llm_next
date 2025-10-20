import { AppListResponse } from "@/app/models/app"
import { fetchAppList } from "@/service/apps"
import { RiApps2Line, RiExchange2Line, RiFile4Line, RiMessage3Line, RiRobot3Line } from "@remixicon/react"
import useSWRInfinite from "swr/infinite"
import Input from "../base/input"
import TabSliderNew from "../base/tab-slider-new"
import CheckboxWithLabel from "../datasets/website/base/checkbox-with-label"
import AppCard from "./app-card"

const getKey = (
  pageIndex: number,
  previousPageData: AppListResponse,
  activeTab: string,
  isCreatedByMe: boolean,
  tags: string[],
  keywords: string,
) => {
  if (!pageIndex || previousPageData.has_more) {
    const params: any = { url: 'apps', params: { page: pageIndex + 1, limit: 30, name: keywords, is_created_by_me: isCreatedByMe } }

    if (activeTab !== 'all')
      params.params.mode = activeTab
    else
      delete params.params.mode

    if (tags.length)
      params.params.tag_ids = tags

    return params
  }
  return null
}
const List = () => {
  const options = [
    { value: 'all', text: "全部", icon: <RiApps2Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'workflow', text: "工作流", icon: <RiExchange2Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'advanced-chat', text: "Chatflow", icon: <RiMessage3Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'chat', text: "聊天助手", icon: <RiMessage3Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'agent-chat', text: "Agent", icon: <RiRobot3Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'completion', text: "文本生成", icon: <RiFile4Line className='mr-1 h-[14px] w-[14px]' /> },
  ]

  const { data, isLoading, error, setSize, mutate } = useSWRInfinite(
    // (pageIndex: number, previousPageData: AppListResponse) => getKey(pageIndex, previousPageData, activeTab, isCreatedByMe, tagIDs, searchKeywords),
    (pageIndex: number, previousPageData: AppListResponse) => getKey(pageIndex, previousPageData, "all", true, [], ""),
    fetchAppList,
    {
      revalidateFirstPage: true,
      shouldRetryOnError: false,
      dedupingInterval: 500,
      errorRetryCount: 3,
    },
  )

  return (
    <>
      <div className="relative flex shrink-0 grow flex-col overflow-y-auto bg-background-body">
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-y-2 bg-background-body px-12 pb-2 pt-4 leading-[56px]">
          <TabSliderNew value="all" onChange={() => { }} options={options} />
          <div className="flex items-center gap-2">
            <CheckboxWithLabel
              className="mr-2"
              isChecked
              label="我创建的"
              onChange={() => { }}
            />
            {/* <TagFilter /> */}
            <Input wrapperClassName="w-[200px]" />
          </div>
        </div>
        {
          (data && data[0]?.total > 0
            ? <div>
              {
                data.map(({ data: apps }) => apps.map((app) => <AppCard key={app.id} app={app} onRefresh={mutate} />))
              }
            </div>
            : <div>

            </div>
          )
        }
      </div>
    </>
  )
}

export default List