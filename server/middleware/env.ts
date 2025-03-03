import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  // Make sure environment variables are available
  process.env.DATO_API_KEY = process.env.DATO_API_KEY || '';
}); 