import { z } from "zod";

export const nameSchema = z.string().min(1).max(255);
export const locationSchema = z.string().min(1).max(255);

export const addHotelSchema = z.object({
  name: nameSchema,
  location: locationSchema,
});
