import Job from "./Job"

function Jobs({ jobs }) {
  if (!jobs) return null
  return (
    <div>
      {jobs.map((job, index) => (
        <Job key={index} job={job} />
      ))}
      <div></div>
    </div>
  )
}

export default Jobs
