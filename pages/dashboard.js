import { useSession, getSession } from "next-auth/react"
import { getUser, getJobsPosted, getApplications } from "lib/data"
import prisma from "lib/prisma"

//components
import Job from "components/Job"
import Link from "next/link"

export default function Dashboard({ user, jobs, applications }) {
  const { data: session, status } = useSession()

  return (
    <>
      <main className="mx-auto max-w-screen-xl px-6">
        <div className="my-10">
          <h2 className="mb-10 text-4xl font-bold">Dashboard</h2>
          {user.company ? (
            <span className="bg-black text-white uppercase text-sm p-2">
              {user.name} Company
            </span>
          ) : (
            <span className="bg-black text-white uppercase text-sm p-2">
              User: {user.name}
            </span>
          )}

          {session && (
            <>
              {user.company ? (
                <p className="my-10 text-2xl text-white black:text-indigo-200 font-normal">
                  All the jobs you posted
                </p>
              ) : (
                <p className="my-10 text-2xl text-white black:text-white font-normal ">
                  your applications
                </p>
              )}
            </>
          )}
        </div>

        {/* Apllications section  */}
        {user.company ? (
          <>
            {jobs.map((job, index) => (
              <div key={index}>
                <Job key={index} job={job} isDashboard={true} />
                <div className="mb-4 mt-20">
                  <div className="px-16 -mt-6">
                    {job.applications.length === 0 ? (
                      <p className="mb-10 text-2xl font-normal">
                        {" "}
                        No Applications so far 😔
                      </p>
                    ) : (
                      <p className="mb-10 text-2xl font-normal">
                        {job.applications.length} applications
                      </p>
                    )}

                    {/* if exist `job.aplications` we make map and we go through the applications that each job has  */}
                    {job.applications?.map((application, application_index) => (
                      <div key={`${index} - ${application_index}`}>
                        <h2>
                          <span>{application.author.name}</span>
                          {application.author.email}{" "}
                        </h2>
                        <p className>{application.coverletter}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {applications.map((application, index) => (
              <div className="mb-4 mt-20 flex justify-center" key={index}>
                <div className="px-16 -mt-6 w-1/2">
                  <Link href={`/job/${application.job.id}`}>
                    <a className="text-xl font-bold underline">
                      {application.job.title}
                    </a>
                  </Link>
                  <h2 className="text-base font-normal mt-3">
                    {application.coverletter}
                  </h2>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  let user = await getUser(session.user.id, prisma)
  user = JSON.parse(JSON.stringify(user))

  let jobs = []
  let applications = []

  if (user.company) {
    jobs = await getJobsPosted(user.id, prisma)
    jobs = JSON.parse(JSON.stringify(jobs))
  } else {
    applications = await getApplications(user.id, prisma)
    applications = JSON.parse(JSON.stringify(applications))
  }

  return {
    props: {
      user,
      jobs,
      applications,
    },
  }
}
