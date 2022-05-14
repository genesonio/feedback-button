import express from "express"
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';

export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => { // request, response //
  const {type, comment, screenshot} = req.body

  
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })
  

  
  return res.status(201).send()
})
