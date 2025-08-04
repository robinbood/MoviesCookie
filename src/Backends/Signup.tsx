import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
import { users } from "src/db/schema"; 

const client = new SQL(Bun.env.DATABASE_URL!);
const db = drizzle(client);

const SigninUser = async (req: Request) => {
    const { name, username, password } = await req.json();
    const exists = await db.select().from(users);
}
