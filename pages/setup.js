import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Setup() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const [name, setName] = useState("")
  const [company, setCompany] = useState(false)

  if (loading) return null

  if (!session || !session.user) {
    router.push("/")
    return null
  }

  if (!loading && session && session.user.name) {
    router.push("/")
  }

  const handleInputName = (e) => {
    setName(e.target.value)
  }

  const handleCheckboxCompany = () => {
    setCompany(!company)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch("/api/setup", {
      body: JSON.stringify({
        name,
        company,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
    session.user.name = name
    session.user.company = company
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 ml-20">
      <div className=" flex-1 mb-5">
        <p className="text-2xl font-bold">Add your Name</p>
        <input
          className="outline-none border p-1 mt-2 text-black"
          type="text"
          name="name"
          value={name}
          onChange={handleInputName}
        />
      </div>
      <div className="flex-1 mb-5">
        <div className="flex-1 mb-5">
          Check this box if you're a company and you want to post jobs
        </div>
        <input
          type="checkbox"
          name="company"
          checked={company}
          onChange={handleCheckboxCompany}
          className="border p-1"
        />
      </div>
      <button className="border px-8 py-2 mt-0 mr-8 font-bold rounded-full">
        Save
      </button>
    </form>
  )
}
