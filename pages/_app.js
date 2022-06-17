import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from "next-themes"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/scrollbar"
import "swiper/css/navigation"
import { getUser } from "lib/data"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
