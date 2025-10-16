import { RiApps2Line, RiExchange2Line, RiFile4Line, RiMessage3Line, RiRobot3Line } from "@remixicon/react"
import Input from "../base/input"
import TabSliderNew from "../base/tab-slider-new"
import TagFilter from "../base/tag-management/filter"
import CheckboxWithLabel from "../datasets/website/base/checkbox-with-label"

const List = () => {
  const options = [
    { value: 'all', text: "全部", icon: <RiApps2Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'workflow', text: "工作流", icon: <RiExchange2Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'advanced-chat', text: "Chatflow", icon: <RiMessage3Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'chat', text: "聊天助手", icon: <RiMessage3Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'agent-chat', text: "Agent", icon: <RiRobot3Line className='mr-1 h-[14px] w-[14px]' /> },
    { value: 'completion', text: "文本生成", icon: <RiFile4Line className='mr-1 h-[14px] w-[14px]' /> },
  ]
  return (
    <>
      <div className="relative flex shrink-0 grow flex-col overflow-y-auto bg-background-body">
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-y-2 bg-background-body px-12 pb-2 pt-4 leading-[56px]">
          <TabSliderNew value="all" onChange={() => { }} options={options} />
          <div className="flex items-center gap-2">
            <CheckboxWithLabel />
            <TagFilter />
            <Input />
          </div>
        </div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </>
  )
}

export default List