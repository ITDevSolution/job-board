export default function utils() {
  const cleanDatabase = async () => {
    await fetch("/api/utils", {
      body: JSON.stringify({
        task: "clean_database",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
  }

  const generateUsersAndJobs = async () => {
    await fetch("/api/utils", {
      body: JSON.stringify({
        task: "generate_users_and_jobs",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
  }

  const generateOneJob = async () => {
    await fetch("/api/utils", {
      body: JSON.stringify({
        task: "generate_one_job",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
  }

  return (
    <div className="mt-10 ml-20">
      <h2 className="mt-10 text-xl">Utils</h2>
      <div className="flex-1 mb-5">
        <button
          className="border px-8 py-2 mt-5 mr-8 font-bold rounded-full hover:bg-black hover:text-white"
          onClick={cleanDatabase}
        >
          Clean Database
        </button>
      </div>
      <div className="flex-1 mb-5">
        <button
          className="border px-8 py-2 mt-5 mr-8 font-bold rounded-full hover:bg-black hover:text-white"
          onClick={generateUsersAndJobs}
        >
          Generate 10 users and some
        </button>
      </div>
      <div className="flex-1 mb-5">
        <button
          className="border px-8 py-2 mt-5 mr-8 font-bold rounded-full hover:bg-black hover:text-white"
          onClick={generateOneJob}
        >
          Generate 1 new job
        </button>
      </div>
    </div>
  )
}
