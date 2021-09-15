import { ButtonElement } from "./Button.styles"

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({ onClick, children }: ButtonProps) => {
  return <ButtonElement onClick={onClick}>{children}</ButtonElement>
}

export default Button
