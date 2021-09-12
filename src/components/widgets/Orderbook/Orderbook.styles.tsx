import { styled } from "linaria/react"

export const OrderbookWrapper = styled.div`
  display: flex;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`

export const SpreadWrapperDesktop = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    display: none;
  }
`

export const SpreadWrapperMobile = styled.div`
  text-align: center;
  padding: 5px;

  @media (min-width: 481px) {
    display: none;
  }
`
