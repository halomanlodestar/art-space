import { Author, Post } from "@/types";

const author: Author = {
  id: "2",
  username: "john_doe",
  email: "john@doe.com",
  name: "John Doe",
  role: "COMMUNITY_CREATOR",
  image:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
