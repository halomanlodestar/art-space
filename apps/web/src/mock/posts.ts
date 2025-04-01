import { Author, Post } from "@/types";

const author: Author = {
  id: "2",
  username: "john_doe",
  email: "john@doe.com",
  name: "John Doe",
  role: "COMMUNITY_CREATOR",
  image: "https://example.com/john_doe.jpg",
  communityId: "1",
};

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Beautiful Sunset",
    content: "A breathtaking view of the sunset over the mountains.",
    createdAt: new Date("2023-10-01T12:00:00Z"),
    updatedAt: new Date("2023-10-01T12:00:00Z"),
    community: {
      id: "1",
      name: "Nature Lovers",
      description: "A community for nature enthusiasts.",
      createdAt: new Date("2023-01-01T12:00:00Z"),
      updatedAt: new Date("2023-01-01T12:00:00Z"),
    },
    author,
    media: [
      "https://images.pexels.com/photos/30601578/pexels-photo-30601578/free-photo-of-vibrant-red-bougainvillea-on-a-garden-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
];
