import prisma from "lib/prisma"

const generateFakerJob = (user) => ({
  title: faker.company.catchPhrase(),
  description: faker.lorem.paragraphs(),
  author: {
    connect: { id: user.id },
  },
})

async function handler(req, res) {
  if (req.method !== "POST") return res.end()

  //Clean database
  if (req.body.task === "clean_database") {
    await prisma.job.deleteMany({})
    await prisma.user.deleteMany({})
  }

  //Generate one Job and random User
  if (req.body.task === "generate_one_job_and_random_user") {
    const users = await prisma.user.findMany({
      where: {
        company: true,
      },
    })
    console.log(users)
    await prisma.job.create({
      data: generateFakerJob(users[0]),
    })
    console.log(users[0])
  }

  //Generate users and jobs
  if (req.body.task === "generate_users_and_jobs") {
    let count = 0
    while (count < 10) {
      await prisma.user.create({
        data: {
          name: faker.internet.userName().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          company: faker.datatype.boolean(),
        },
      })
      count++
    }
    const users = await prisma.user.findMany({
      where: {
        company: true,
      },
    })

    users.forEach(async (user) => {
      await prisma.job.create({
        data: generateFakerJob(user),
      })
    })
  }

  res.end()
}

export default handler
