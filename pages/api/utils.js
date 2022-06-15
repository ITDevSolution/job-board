import prisma from "lib/prisma"
import { faker } from "@faker-js/faker"

const generateFakeJob = (user) => ({
  title: faker.company.catchPhrase(),
  description: faker.lorem.paragraphs(),
  image: faker.image.business(),
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

  //Generate one Job
  if (req.body.task === "generate_one_job") {
    const users = await prisma.user.findMany({
      where: {
        company: true,
      },
    })

    await prisma.job.create({
      data: generateFakeJob(users[0]),
    })
  }

  //Generate users and jobs
  if (req.body.task === "generate_users_and_jobs") {
    let count = 0
    while (count < 5) {
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
        data: generateFakeJob(user),
      })
    })
  }

  res.end()
}

export default handler
