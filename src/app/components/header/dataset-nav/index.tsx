import { RiBook2Fill, RiBook2Line } from "@remixicon/react";
import Nav from "../nav";

export default function DatasetNav() {
  return (
    <Nav
      isApp
      icon={<RiBook2Line className="size-4" />}
      activeIcon={<RiBook2Fill className="size-4" />}
      text="知识库"
      activeSegment={["apps", "app"]}
      link="/apps"
      createText="创建知识库"
      curNav={undefined}
      navigationItems={[]}
      onCreate={(state) => console.log(state)}
      onLoadMore={() => console.log("load more")}
    />
  )
}