import { usePageVisibility } from "react-page-visibility"
import { useMediaQuery } from "react-responsive"
import { Widget } from "@/types/Widget"

interface WidgetProviderProps {
  children: React.ReactNode
}

const WidgetProvider = ({ children }: WidgetProviderProps) => {
  return <>{children}</>
}

export const withWidgetProvider = <T extends Widget>(
  Component: React.ComponentType<T>
) => {
  const WrappedComponent = (props: T) => {
    const isPageVisible = usePageVisibility()
    const isMobile = useMediaQuery({ query: "(max-width: 480px)" })

    return (
      <WidgetProvider>
        <Component {...props} isVisible={isPageVisible} isMobile={isMobile} />
      </WidgetProvider>
    )
  }
  return WrappedComponent
}

export default WidgetProvider
