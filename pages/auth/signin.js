import {
  getProviders,
  signIn as SignIntoProvider,
  getSession,
  getCsrfToken,
} from "next-auth/react"

function signIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="border px-5 py-2 rounded-full mb-5 mt-5 hover:bg-black hover:text-white"
            onClick={() =>
              SignIntoProvider(provider.id, {
                callbackUrl: "/",
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
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

export default signIn
