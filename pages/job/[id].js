import { getJob, alreadyApplied } from "lib/data"
import prisma from "lib/prisma"
import Image from "next/image"

import { useSession, getSession } from "next-auth/react"

import Link from "next/link"

export default function Job({ job, applied }) {
  const isDashboard = true
  return (
    <div className="flex flex-col w-1/2 mx-auto">
      <div className="text-center p-4 m-4">
        <Link href={`/`}>
          <a href="" className="mb-10 font-bold underline mr-10 text-lg">
            back Home
          </a>
        </Link>
        {!isDashboard && (
          <Link href={`/dashboard`}>
            <a href="" className="mb-10 text-lg font-bold underline">
              back Dashboard
            </a>
          </Link>
        )}
      </div>

      <div className="text-center p-4 m-4">
        <h2 className="mb-10 text-4xl font-bold">{job.title}</h2>
      </div>
      <div className="relative block overflow-hidden text-center">
        {job.image ? (
          <Image
            src={job.image}
            alt={job.title}
            layout="fill"
            objectFit="cover"
            priority={true}
            className=""
          />
        ) : (
          <Image
            src={`/static/images/07.jpg`}
            alt={job.title}
            width={480}
            height={300}
            objectFit="cover"
            priority={true}
            className=" "
          />
        )}
      </div>

      <div className="mb-4 mt-20 text-center">
        <div className="pl-16 pr-16 -mt-6">
          <p className="text-base font-normal mt-3">{job.description}</p>
          <div className="mt-4">
            <h4 className="inline">Posted by</h4>
            <div className="inline">
              <div className="ml-3 -mt-6 inline">
                <span>
                  <Link href={`/company/${job.author.id}`}>
                    <a>
                      <span className="text-base font-medium color-primary underline">
                        {job.author.name}
                      </span>
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {applied ? (
        <div className="mt-20 flex justify-center">
          <Link href={`/dashboard`}>
            <button className="border border-white font-bold rounded-full px-7 py-2">
              You already applied!
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-20 flex justify-center">
          <Link href={`/job/${job.id}/apply`}>
            <button className="border border-white font-bold rounded-full px-7 py-2">
              Apply to this job
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  let job = await getJob(context.params.id, prisma)
  job = JSON.parse(JSON.stringify(job))

  const applied = await alreadyApplied(
    session.user.id,
    context.params.id,
    prisma
  )

  return {
    props: {
      job,
      applied,
    },
  }
}
