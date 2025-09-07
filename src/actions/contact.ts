// src/actions/contact.ts
'use server';

import { z } from 'zod';
import { confirmSubmission } from '@/ai/flows/contact-form-submission-confirmation';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type FormState = {
  success: boolean;
  message: string;
};

// This SVG is an animated checkmark. It's simple and effective for a success indicator.
// The colors are hardcoded because CSS variables won't work in a data URI context like this.
const createSuccessAnimation = () => {
  const svg = `
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <style>
        .circle { stroke-dasharray: 283; stroke-dashoffset: 283; animation: draw-circle 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        .check { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw-check 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.5s forwards; }
        @keyframes draw-circle { to { stroke-dashoffset: 0; } }
        @keyframes draw-check { to { stroke-dashoffset: 0; } }
      </style>
      <circle cx="50" cy="50" r="45" fill="none" stroke="#6F00FF" stroke-width="5" class="circle" transform="rotate(-90 50 50)" />
      <path d="M30 52 l14 14 l28 -28" fill="none" stroke="#00FFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" class="check" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors.map((e) => e.message).join(' '),
    };
  }
  
  // Here, you would typically handle the form submission, e.g., send an email or save to a database.
  // We'll simulate a successful submission.
  console.log('Form data is valid:', parsed.data);

  try {
    const successAnimationDataUri = createSuccessAnimation();
    const result = await confirmSubmission({ successAnimationDataUri });
    
    return {
      success: true,
      message: result.confirmationMessage,
    };
  } catch (error) {
    console.error('AI confirmation error:', error);
    return {
      success: false,
      message: 'There was an error processing your request. Please try again.',
    };
  }
}
