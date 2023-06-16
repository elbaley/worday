import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Demo users
  await prisma.user.createMany({
    data: [
      { name: 'furkan', username: 'furkan',birthDate:"2023-01-25T23:41:52.074Z",profileImg:"https:////cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/804.jpg",password:"123" },
      { name: 'didem', username: 'didem',birthDate:"2020-01-25T23:41:52.074Z",profileImg:"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/459.jpg",password:"123" },
    ],
  });

  // Demo posts
  await prisma.post.createMany({
    data: [
      { postContent: 'hello', authorId: 1 ,pubDate:"2023-02-18T20:50:47.583Z"},
    ],
  });

  // Demo likes
  await prisma.likes.createMany({
    data: [
      { post_id: 1, user_id: 2 },
      // Diğer beğeniler...
    ],
  });

}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
