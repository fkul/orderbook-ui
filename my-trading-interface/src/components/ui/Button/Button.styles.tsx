import { styled } from "linaria/react"

export const ButtonElement = styled.button`
  color: var(--color-btn-text);
  background-color: var(--color-btn-bg);
  border: 0;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-btn-bg-hover);
  }
`
