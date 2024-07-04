import { db } from "@/db";
import { usersTable } from "@/db/schema";


export default async function Home() {

  //const post = await db.query.postsTable.findMany()

  return (
    <div>hi


      <form action={async () => {
        'use server'
        //await db.insert(usersTable).values({
          //id: "2",
         // age: 21,
         // email: "text@example.com",
         // name: "syco"
       // })

       
      }}><button>submit</button></form>


     
    </div>
  );
}
