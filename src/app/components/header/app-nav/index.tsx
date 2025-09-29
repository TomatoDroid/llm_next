import { RiRobot2Fill, RiRobot2Line } from "@remixicon/react";
import Nav from "../nav";

export default function AppNav() {
  return (
    <>
      <Nav
        isApp
        icon={<RiRobot2Line className="size-4" />}
        activeIcon={<RiRobot2Fill className="size-4" />}
        text="工作室"
        activeSegment={["apps", "app"]}
        link="/apps"
        createText="创建应用"
        curNav={ undefined }
        navigationItems={[]}
        onCreate={(state) => console.log(state)}
        onLoadMore={() => console.log("load more")}
      />
    </>
  )
}