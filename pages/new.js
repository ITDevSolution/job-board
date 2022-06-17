import { useState } from "react"
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"

import { getUser } from "lib/data"
import prisma from "lib/prisma"

import { Header } from "components/Header"

export default function New({ user }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [salary, setSalary] = useState("")
  const [location, setLocation] = useState("")
  const { data: session } = useSession()

  const router = useRouter()

  if (!session || !session.user) return null

  const handleSubmitPost = async (e) => {
    e.preventDefault()

    await fetch("/api/job", {
      body: JSON.stringify({
        title,
        description,
        location,
        salary,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    router.push("/dashboard")
  }

  return (
    <>
      <Header user={user} />
      <form onSubmit={handleSubmitPost}>
        <div className="flex flex-col w-1/2 mx-auto">
          <h2 className="my-10 text-4xl font-bold">Post a new Job</h2>
          {/* Title input */}
          <div className="py-2 mr-1">
            <input
              className="border p-4 w-2/4 text-lg font-medium bg-transparent outline-none "
              placeholder="Job title"
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </div>
          {/* Description input */}
          <div className="py-2 mr-1">
            <textarea
              className="border p-4 w-2/4 text-lg font-medium bg-transparent outline-none"
              cols="50"
              rows="2"
              placeholder="Job Description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* Salary input */}
          <div className="py-2 mr-1">
            <input
              className="border p-4 w-2/4 text-lg font-medium bg-transparent outline-none"
              placeholder="Salary"
              required
              onChange={(e) => setSalary(e.target.value)}
              type="text"
            />
          </div>
          {/* Location input */}
          <div className="py-2 mr-1">
            <input
              className="border p-4 w-2/4 text-lg font-medium bg-transparent outline-none"
              placeholder="Location"
              required
              onChange={(e) => setLocation(e.target.value)}
              type="text"
            />
          </div>
          {/* Button Post Job */}
          <div className="my-5">
            <button className="rounded-full px-8 py-2 border border-purple-600 dark:border-white font-bold transition-all dark:bg-indigo-700 ">
              Post Job
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  let user = await getUser(session.user.id, prisma)
  user = JSON.parse(JSON.stringify(user))

  return {
    props: {
      user,
    },
  }
}
