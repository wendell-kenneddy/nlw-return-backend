import { MailAdapter } from '../adapters/mailAdapter';
import { FeedbacksRepository } from '../repositories/FeedbacksRepository';

interface SubmitFeedbackData {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly mailAdapter: MailAdapter
  ) {}

  async execute(data: SubmitFeedbackData) {
    const { type, comment, screenshot } = data;

    if (!type) {
      throw new Error('Type Required');
    }

    if (!comment) {
      throw new Error('Comment Required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create(data);
    await this.mailAdapter.sendMail({
      subject: 'New Feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Feedback type: ${type}</p>`,
        `<p>Comment: ${comment}</p>`,
        screenshot
          ? `<img src="${screenshot}" alt="Feedback screenshot" />`
          : ``,
        '</div>'
      ].join('\n')
    });
  }
}
