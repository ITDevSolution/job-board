import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { Header } from "components/Header"

import { ThemeProvider } from "next-themes"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/scrollbar"
import "swiper/css/navigation"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
