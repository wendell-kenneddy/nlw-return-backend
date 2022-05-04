import { prisma } from '../../prisma';
import {
  FeedbackCreateData,
  FeedbacksRepository
} from '../FeedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  constructor() {}

  async create(data: FeedbackCreateData) {
    await prisma.feedback.create({ data });
  }
}
