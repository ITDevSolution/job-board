import { getSession, useSession } from "next-auth/react"
import { getUser, getJobsPosted } from "lib/data"
import prisma from "lib/prisma"

//components
import Jobs from "components/Jobs"

export default function dashboard({ user, jobs }) {
  const { data: session, status } = useSession()

  return (
    <>
      <main className="mx-auto max-w-screen-xl px-6">
        <div className="my-10">
          <h2 className="mb-10 text-4xl font-bold">Dashboard</h2>
          {user.company && (
            <span className="bg-black text-white uppercase text-sm p-2">
              Company
            </span>
          )}
          {session && (
            <>
              {user.company && (
                <p className="my-10 text-2xl text-black black:text-indigo-200 font-normal">
                  All the jobs you posted
                </p>
              )}
            </>
          )}
        </div>
        <Jobs jobs={jobs} isDashboard={true} />
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  let user = await getUser(session.user.id, prisma)
  user = JSON.parse(JSON.stringify(user))

  let jobs = await getJobsPosted(user.id, prisma)
  jobs = JSON.parse(JSON.stringify(jobs))

  return {
    props: {
      user,
      jobs,
    },
  }
}
