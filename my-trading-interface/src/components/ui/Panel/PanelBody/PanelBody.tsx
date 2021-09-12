import { PanelBodyWrapper } from "./PanelBody.styles"

interface PanelBodyProps {
  children: React.ReactNode
}

const PanelBody = ({ children }: PanelBodyProps) => {
  return <PanelBodyWrapper>{children}</PanelBodyWrapper>
}

export default PanelBody
