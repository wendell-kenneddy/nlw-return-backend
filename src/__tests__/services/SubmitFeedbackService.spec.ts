import { SubmitFeedbackService } from '../../services/SubmitFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedbackService = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackService.execute({
        type: 'BUG',
        comment: 'New feedback',
        screenshot: 'data:image/png;base64,something'
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledWith({
      type: 'BUG',
      comment: 'New feedback',
      screenshot: 'data:image/png;base64,something'
    });
    expect(sendMailSpy).toHaveBeenCalledWith({
      subject: 'New Feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        '<p>Feedback type: BUG',
        '<p>Comment: New feedback',
        '</div>'
      ].join('\n')
    });
  });

  it('should not be able to submit a feedback without a type', async () => {
    await expect(
      submitFeedbackService.execute({
        type: '',
        comment: 'New feedback',
        screenshot: 'data:image/png;base64,something'
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(
      submitFeedbackService.execute({
        type: 'IDEA',
        comment: '',
        screenshot: 'data:image/png;base64,something'
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it('should not be able to submit a feedback with an invalid screenshot format', async () => {
    await expect(
      submitFeedbackService.execute({
        type: 'OTHER',
        comment: 'A cool idea.',
        screenshot: 'something'
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });
});
