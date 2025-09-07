'use server';

/**
 * @fileOverview Handles the contact form submission confirmation process.
 *
 * - confirmSubmission - A function that triggers the submission confirmation flow.
 * - ConfirmSubmissionInput - The input type for the confirmSubmission function.
 * - ConfirmSubmissionOutput - The return type for the confirmSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConfirmSubmissionInputSchema = z.object({
  successAnimationDataUri: z
    .string()
    .describe(
      "Animation data URI to display on successful form submission.  It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ConfirmSubmissionInput = z.infer<typeof ConfirmSubmissionInputSchema>;

const ConfirmSubmissionOutputSchema = z.object({
  confirmationMessage: z
    .string()
    .describe('A confirmation message to display to the user.'),
});
export type ConfirmSubmissionOutput = z.infer<typeof ConfirmSubmissionOutputSchema>;

export async function confirmSubmission(input: ConfirmSubmissionInput): Promise<ConfirmSubmissionOutput> {
  return confirmSubmissionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'confirmSubmissionPrompt',
  input: {schema: ConfirmSubmissionInputSchema},
  output: {schema: ConfirmSubmissionOutputSchema},
  prompt: `You are a chatbot confirming that a user successfully submitted a contact form.

  Respond with a friendly confirmation message to let the user know their submission was successful and that you will reach out to them soon.

  Display the following success animation. 

  Animation: {{media url=successAnimationDataUri}}
  `,
});

const confirmSubmissionFlow = ai.defineFlow(
  {
    name: 'confirmSubmissionFlow',
    inputSchema: ConfirmSubmissionInputSchema,
    outputSchema: ConfirmSubmissionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

