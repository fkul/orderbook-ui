import PanelBody from "./PanelBody"
import PanelHeader from "./PanelHeader"
import { PanelWrapper } from "./Panel.styles"

interface PanelProps {
  children: React.ReactNode
}

const Panel = ({ children }: PanelProps) => {
  return <PanelWrapper>{children}</PanelWrapper>
}

export default Object.assign(Panel, { Body: PanelBody, Header: PanelHeader })
