import { css } from "linaria"
import { styled } from "linaria/react"

export const GlobalThemedStyles = styled.div`
  :global() {
    html {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: sans-serif;
      font-size: 14px;
      color: #afb2b9;
      background-color: #212834;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  }
`

export const themeDefault = css`
  --color-primary: #4d37d0;

  --color-text-primary: #afb2b9;
  --color-text-secondary: #434956;

  --color-bg-primary: #212834;
  --color-bg-secondary: #121723;

  --color-ask-primary: #b83134;
  --color-ask-secondary: #351c24;

  --color-bid-primary: #198b5e;
  --color-bid-secondary: #142e2d;
`
