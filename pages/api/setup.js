import prisma from "lib/prisma"
import { getSession } from "next-auth/react"

export default async function handlerSetup(req, res) {
  const session = await prisma.getSession({ req })
  if (!session) return res.end()

  if (req.method === "POST") {
    await prisma.user.update({
      data: {
        name: req.body.name,
        company: req.body.company,
      },
    })

    res.end()
  }
}
