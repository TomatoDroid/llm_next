import { App } from "@/types/app"

export type AppCardProps = {
  app: App
  onRefresh?: () => void
}

const AppCard = ({ app, onRefresh }: AppCardProps) => {
  return (
    <>
      <div className="group relative col-span-1 inline-flex h-[160px] cursor-pointer flex-col rounded-xl border-[1px] border-solid border-components-card-border bg-components-card-bg shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg"
        onClick={() => { }}
      >
        <div className="">
          <div>

          </div>
          <div>
            <div>
              <div>{app.name}</div>
            </div>
            <div>
              <div>{app.author_name}</div>
              <div>.</div>
              <div>{app.updated_at}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppCard