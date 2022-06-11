import Link from "next/link"

function Job({ job }) {
  return (
    <div className="mb-4 mt-20 pl-16 pr-16">
      <Link href={`/job/${job.id}`}>
        <a className="text-xl font-bold underline">{job.title}</a>
      </Link>
      <h2 className="text-base font-normal mt-3">{job.description}</h2>
      <div className="mt-4">
        <h4 className="inline">Posted by</h4>
        <div className="ml-3 -mt-6 inline">
          <span>
            <p>
              <span className="text-base font-medium color-primary underline">
                {job.author.name}
              </span>
            </p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Job
