import { Profiler, useState } from "react"
import { usePageVisibility } from "react-page-visibility"
import { useMediaQuery } from "react-responsive"
import { useAvg } from "@fkul/avg"
import { Widget } from "@/types/Widget"

interface WidgetProviderProps {
  children: React.ReactNode
}

const WidgetProvider = ({ children }: WidgetProviderProps) => {
  return <>{children}</>
}

export const withWidgetProvider = <T extends Widget>(
  Component: React.ComponentType<T>,
  useThrottling: boolean = false
) => {
  const WrappedComponent = (props: T) => {
    const [throttleWaitMs, setThrottleWaitMs] = useState<number>(100)
    const isPageVisible = usePageVisibility()
    const isMobile = useMediaQuery({ query: "(max-width: 480px)" })
    const avg = useAvg()

    const onProfilerRender = (
      id: string,
      phase: "mount" | "update",
      actualDuration: number
    ) => {
      avg.add(actualDuration)
      const newThrottleWaitMs = Math.max(100, Math.floor(avg.get() / 10) * 100)

      if (
        avg.getCount() >= 100 &&
        Math.abs(newThrottleWaitMs - throttleWaitMs) >= 100
      ) {
        setThrottleWaitMs(newThrottleWaitMs)
      }
    }

    return (
      <WidgetProvider>
        {useThrottling ? (
          <Profiler
            id={Component.displayName + Math.random().toString()}
            onRender={onProfilerRender}
          >
            <Component
              {...props}
              isVisible={isPageVisible}
              isMobile={isMobile}
              throttleWaitMs={throttleWaitMs}
            />
          </Profiler>
        ) : (
          <Component {...props} isVisible={isPageVisible} isMobile={isMobile} />
        )}
      </WidgetProvider>
    )
  }
  return WrappedComponent
}

export default WidgetProvider
