import { SQL } from "bun";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/bun-sql";
import { users } from "src/db/schema"; 

const client = new SQL(Bun.env.DATABASE_URL!)
const db = drizzle({client})

const SigninUser = async(req:Request) => {
    const {username,password} = await req.json();

    const user = await db.select().from(users).where(eq(users.username,username)).limit(1);

    if(!user[0] ){
        return new Response("Username Doesn't exist",{status:401})
    }
    const isMatch = await Bun.password.verify(password,user[0].password)
    if (!isMatch) {
        return new Response("Invalid Credentials",{status:401})
    }

}

 