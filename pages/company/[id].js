import { getCompany, getCompanyJobs } from "lib/data"
import prisma from "lib/prisma"

import Link from "next/link"
import Job from "components/Job"

export default function company({ jobs, company }) {
  console.log(company)

  return (
    <div>
      <div>
        <Link href={`/`}>
          <a className="font-gold">back</a>
        </Link>
      </div>
      <div className="text-center">
        <h2 className="font-bold">Profile of {company.name}</h2>
      </div>

      <div>
        <div>
          <p className="text-xl font-bold text-center">Company jobs</p>
          {jobs.map((job, index) => (
            <Job key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  let company = await getCompany(params.id, prisma)

  let jobs = await getCompanyJobs(params.id, prisma)

  company = JSON.parse(JSON.stringify(company))
  jobs = JSON.parse(JSON.stringify(jobs))

  return {
    props: {
      jobs,
      company,
    },
  }
}
