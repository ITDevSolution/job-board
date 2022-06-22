// Next Auth & Next Image
import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useState, useEffect } from "react"

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
import { Header } from "components/Header"
import Link from "next/link"

export default function Home({ jobs, user }) {
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    if (session && !session.user.name) {
      router.push("/setup")
    }
    setLoading(false)
  }, [session])

  return (
    <>
      <Header user={user} />
      <Hero user={user} />
      {loading && <Loading />}
      <main className="mx-auto max-w-screen-xl px-6 sm:px-8 ">
        {session && (
          <>
            <p className="my-10 text-2xl font-normal">
              Welcome, {user.name}
              {user.company && (
                <span className="bg-black text-white uppercase text-sm p-2">
                  Company
                </span>
              )}
            </p>
            {user.company ? (
              <>
                <p className="text-3xl font-bold my-5 ">Actions</p>
                <Link href={`/new`}>
                  <button className="rounded-full border border-indigo-900 py-4 px-5 hover:bg-slate-300 transition-all dark:hover:bg-white mr-4 hover:text-blue-500 font-bold">
                    Click here to post a new job
                  </button>
                </Link>

                <Link href={`/dashboard`}>
                  <button className="rounded-full border border-indigo-900 py-4 px-5 hover:bg-slate-300 transition-all dark:hover:bg-white hover:text-blue-500 font-bold">
                    Se all the jobs you posted
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button className="border px-7 py-2 border-indigo-900 dark:border-slate-100 dark:hover:bg-slate-50 dark:hover:text-indigo-600 dark:hover:border-indigo-900 transition-colors ease-in-out duration-500 rounded-full font-bold ">
                  see all the jobs you applied to
                </button>
              </>
            )}
          </>
        )}
        <div className="mt-16 space-y-20">
          <Jobs jobs={jobs} />
          <TopCompanies />
        </div>
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
