'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing user queries in a Chatbase chatbot
 * for portfolio-related questions, providing more immediate and relevant answers.
 * 
 * - analyzeQuery - A function that analyzes user queries and enhances chatbot responses.
 * - AnalyzeQueryInput - The input type for the analyzeQuery function.
 * - AnalyzeQueryOutput - The return type for the analyzeQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeQueryInputSchema = z.object({
  query: z.string().describe('The user query to be analyzed.'),
});
export type AnalyzeQueryInput = z.infer<typeof AnalyzeQueryInputSchema>;

const AnalyzeQueryOutputSchema = z.object({
  enhancedQuery: z.string().describe('The enhanced query for the chatbot.'),
  relevant: z.boolean().describe('Whether the query is portfolio-related.'),
});
export type AnalyzeQueryOutput = z.infer<typeof AnalyzeQueryOutputSchema>;

export async function analyzeQuery(input: AnalyzeQueryInput): Promise<AnalyzeQueryOutput> {
  return analyzeQueryFlow(input);
}

const analyzeQueryPrompt = ai.definePrompt({
  name: 'analyzeQueryPrompt',
  input: {schema: AnalyzeQueryInputSchema},
  output: {schema: AnalyzeQueryOutputSchema},
  prompt: `You are an AI assistant analyzing user queries for a personal portfolio website chatbot.

  Determine if the query is related to the portfolio (e.g., projects, skills, experience, contact information).
  If it is, enhance the query to be more specific and helpful for the chatbot.
  If not, return the original query and indicate that it's not portfolio-related.

  Original Query: {{{query}}}

  Instructions:
  1. Analyze the 'Original Query'.
  2. If the query is portfolio-related, rephrase it to be more direct and specific.
  3. Set 'relevant' to true if the query is portfolio-related, otherwise false.
  4. Return the rephrased query as 'enhancedQuery'.

  Example 1:
  Original Query: what projects have you worked on?
  enhancedQuery: List all software and machine learning projects in the portfolio.
  relevant: true

  Example 2:
  Original Query: what is the meaning of life?
  enhancedQuery: what is the meaning of life?
  relevant: false

  Example 3:
  Original Query: How can I contact you?
  enhancedQuery: What is the best email address to contact Mohiudeen?
  relevant: true`,
});

const analyzeQueryFlow = ai.defineFlow(
  {
    name: 'analyzeQueryFlow',
    inputSchema: AnalyzeQueryInputSchema,
    outputSchema: AnalyzeQueryOutputSchema,
  },
  async input => {
    const {output} = await analyzeQueryPrompt(input);
    return output!;
  }
);
