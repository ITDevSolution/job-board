import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-neutral-100 dark:bg-gray-800 text-gray-800 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
