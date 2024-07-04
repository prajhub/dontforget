import { db } from "@/db";
import { postsTable, usersTable } from "@/db/schema";
import Image from "next/image";

export default async function Home() {

  const post = await db.query.postsTable.findMany()

  return (
    <div>hi


      <form action={async () => {
        'use server'
        await db.insert(usersTable).values({
          id: 1,
          age: 21,
          email: "text@example.com",
          name: "syco"
        })

        await db.insert(postsTable).values({
          title: "Was gang",
          content: "yolo",
          userId: 1
        })
      }}><button>submit</button></form>

      {post.map(post => (
        <div>{post.title}</div>
      ))}
    </div>
  );
}
