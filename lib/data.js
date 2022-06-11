export const getJobs = async (prisma) => {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  })

  return jobs
}

export const getJob = async (id, prisma) => {
  const job = await prisma.job.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  })
  return job
}
