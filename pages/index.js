import { signIn } from "next-auth/react"
import Image from "next/image"

import googleImage from "../public/static/images/google.jpg"

export default function Home() {
  return (
    <button className="" onClick={signIn}>
      Sign In With Google
      <Image
        className="rounded-full"
        src={googleImage}
        width="150"
        height="80"
      />
    </button>
  )
}
