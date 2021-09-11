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
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  }

  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  width: 100vw;
  min-height: 100vh;
`

export const themeDefault = css`
  --color-primary: #4d37d0;

  --color-text-primary: #adb0b7;
  --color-text-secondary: #363b48;

  --color-bg-primary: #212834;
  --color-bg-secondary: #121723;

  --color-ask-primary: #9b2b2f;
  --color-ask-secondary: #351c24;

  --color-bid-primary: #17895b;
  --color-bid-secondary: #142e2d;
`
