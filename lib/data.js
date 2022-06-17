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
export const getCompany = async (company_id, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      id: company_id,
    },
  })
  return user
}

export const getCompanyJobs = async (company_id, prisma) => {
  const jobs = await prisma.job.findMany({
    where: {
      authorId: company_id,
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

export const getUser = async (id, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return user
}

export const getJobsPosted = async (user_id, prisma) => {
  const jobs = await prisma.job.findMany({
    where: {
      authorId: user_id,
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
