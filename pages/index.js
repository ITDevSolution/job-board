// Next Auth & Next Image
import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

//Hooks
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"

//Datas methods implements and prisma connector
import { getJobs, getUser } from "lib/data"
import prisma from "lib/prisma"
//Statics
import googleImage from "../public/static/images/google.jpg"
// components
import Jobs from "components/Jobs"
import Loading from "components/Loading"
import { Hero } from "components/Hero"
import { TopCompanies } from "components/TopCompanies"
import { Footer } from "components/Footer"

export default function Home({ jobs, user }) {
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  if (session && !session.user.name) {
    setLoading(true)
    router.push("/setup")
    setLoading(false)
  }

  return (
    <>
      <Hero />
      <main className="mx-auto max-w-screen-xl px-6 sm:px-8 ">
        <div className="mt-16 space-y-20">
          <Jobs jobs={jobs} />
          <TopCompanies />
        </div>
        {/* <FeaturedJobs /> */}
        {session && (
          <>
            <p className="mb-10 text-2xl font-normal">
              Welcome, {user.name}
              {user.company && (
                <span className="bg-black text-white uppercase text-sm p-2">
                  Company
                </span>
              )}
            </p>
            {user.company ? (
              <>
                <button>Click here to post a new job</button>
                <button>Se all the jobs you posted</button>
                <button
                  className="py-4 px-6 m-5 border rounded-full border-neutral-900 text-xl bg-white"
                  onClick={() => signOut()}
                >
                  SignOut
                </button>
              </>
            ) : (
              <>
                <button>see all the jobs you applied to</button>
                <button
                  className="py-4 px-6 m-5 border rounded-full border-neutral-900 text-xl bg-white"
                  onClick={() => signOut()}
                >
                  SignOut
                </button>
              </>
            )}
          </>
        )}
        {/* <div className="mt-10">
          <div className="text-center p-4 m-4">
            <h2 className="mb-10 text-4xl font-bold">Find a Job!</h2>
          </div>

          {!session && (
            <div>
              <button className="" onClick={signIn}>
                Sign In With Google
                <Image
                  className="rounded-full"
                  src={googleImage}
                  width="150"
                  height="80"
                />
              </button>
            </div>
          )}
        </div> */}
      </main>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))

  if (!session) {
    return {
      props: { jobs },
    }
  }

  let user = await getUser(session.user.id, prisma)
  user = JSON.parse(JSON.stringify(user))

  return {
    props: {
      jobs,
      user,
    },
  }
}
