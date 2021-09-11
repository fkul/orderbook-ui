import Head from "next/head"
import { GlobalThemedStyles, themeDefault } from "./Layout.styles"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <GlobalThemedStyles className={themeDefault}>
      <Head>
        <title>My Trading Interface</title>
        <meta name="description" content="My Trading Interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </GlobalThemedStyles>
  )
}

export default Layout
