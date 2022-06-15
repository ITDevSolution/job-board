import Image from "next/image"
import Link from "next/link"

function Job({ job }) {
  return (
    <>
      {job.image && (
        <Link href={`/job/${job.id}`}>
          <a className="group block rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md dark:bg-slate-900 dark:border-slate-900 hover:shadow-lg hover:-translate-y-1 tranisition-all duration-150 dark:bg-slate-70">
            <div className="relative block overflow-hidden pt-[70%]">
              <Image
                src={job.image}
                alt={job.title}
                layout="fill"
                objectFit="cover"
                priority={true}
                className="transition-all duration-200 group-hover:scale-[102%]"
              />
            </div>

            <div className="flex flex-col p-4 border-t dark:border-slate-600">
              <h5 className="block truncate text-xl font-semibold capitalize dark:text-white">
                {job.title}
              </h5>
              {/* <span className="block truncate text-slate-500 dark:text-slate-400">
                {job.author.name}
              </span> */}
            </div>
          </a>
        </Link>
      )}
      {/* <Link href={`/job/${job.id}`}>
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
      </div> */}
    </>
  )
}

export default Job
