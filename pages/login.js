import Email from "components/auth/Email"
import OAuth from "components/auth/OAuth"
import {
  getProviders,
  signIn as SignIntoProvider,
  getSession,
  getCsrfToken,
} from "next-auth/react"

export default function login({ providers, session, csrfToken }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col text-center max-w-md w-full border p-4 shadow-sm">
        <h2 className="text-center font-bold uppercase text-zinc-600 tracking-wide">
          Login FlavioBootcamp
        </h2>
        <p className="text-center">Login with NextAuth</p>
        <Email providers={providers} csrfToken={csrfToken} />
        <div className="text-center">✦ Or ✦</div>
        <OAuth providers={providers} csrfToken={csrfToken} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  const session = await getSession()
  const csrfToken = await getCsrfToken()

  return {
    props: {
      providers,
      session,
      csrfToken,
    },
  }
}
