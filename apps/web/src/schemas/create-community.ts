import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

let MAX_FILE_SIZE = 5_000_000; // 5MB

export const createCommunitySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z.any().optional(),
  bannerImage: z.any().optional(),
});

export type CreateCommunitySchema = z.infer<typeof createCommunitySchema>;
