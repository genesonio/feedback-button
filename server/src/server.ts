import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

// GET, POST, PUT, PATCH, DELETE

// GET = Buscar informações
// POST = Cadastrar informações
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar uma informação

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "56cc6c954ae261",
    pass: "ba1bdfc5017888"
  }
});

app.post('/feedbacks', async (req, res) => { // request, response //
  const {type, comment, screenshot} = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })
  
  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Genésio Pacheco <genesio.s.p.28@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;
      ">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('')
  })
  
  return res.status(201).json(feedback)
})



app.listen(3333, () => {
  console.log('HTTP server running!')
})
