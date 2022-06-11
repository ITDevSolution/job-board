import { signIn } from "next-auth/react"
import Image from "next/image"

import { getJobs } from "lib/data"
import prisma from "lib/prisma"

import googleImage from "../public/static/images/google.jpg"

import Jobs from "components/Jobs"

export default function Home({ jobs }) {
  return (
    <div className="mt-10">
      <div className="text-center p-4 m-4">
        <h2 className="mb-10 text-4xl font-bold">Find a Job!</h2>
      </div>
      <Jobs jobs={jobs} />
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
  )
}

export async function getServerSideProps(context) {
  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))

  return {
    props: {
      jobs,
    },
  }
}
