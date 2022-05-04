import { Router } from 'express';
import { NodemailerMailAdapter } from '../adapters/nodemailer/NodemailerMailAdapter';
import { PrismaFeedbacksRepository } from '../repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackService } from '../services/SubmitFeedbackService';

const routes = Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const feedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackService = new SubmitFeedbackService(
    feedbacksRepository,
    nodemailerMailAdapter
  );
  await submitFeedbackService.execute({
    type,
    comment,
    screenshot
  });

  return res.status(201).send();
});

export { routes };
