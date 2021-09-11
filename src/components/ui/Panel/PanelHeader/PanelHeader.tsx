import { PanelHeaderWrapper } from "./PanelHeader.styles"

interface PanelHeaderProps {
  title: string
  children?: React.ReactNode
}

const PanelHeader = ({ title, children }: PanelHeaderProps) => {
  return (
    <PanelHeaderWrapper>
      <span>{title}</span>
      {children}
    </PanelHeaderWrapper>
  )
}

export default PanelHeader
