import { useState } from "react"
import { signIn } from "next-auth/react"
import Loading from "components/Loading"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

function BtnLogin({
  children,
  provider,
  bgColor,
  txtColor,
  csrfToken,
  options,
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    provider.id === "email"
      ? await signIn(provider.id, {
          email: options.email,
          callbackUrl: "/",
        })
      : await signIn(provider.id, {
          options,
          callbackUrl: "/",
        })
    setLoading(false)

    // if (provider.id === "credentials") {
    //   if (res.error) {
    //     if (res.error === "Success! Check your email.") {
    //       signIn("email", { email: options.email })
    //       return toast.success(res.error)
    //     }
    //     return toast.error(res.error)
    //   }

    //   return router.push("/")
    // }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

        {children}
        <button
          type="submit"
          className="rounded-full px-8 py-2 border shadow-md text-white my-2"
          style={{ background: `${bgColor}` }}
        >
          Sign in with {provider.name}
        </button>
        {loading && <Loading />}
      </form>
    </>
  )
}

export default BtnLogin
