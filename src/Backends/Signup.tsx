import { SQL } from "bun";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/bun-sql";
import { users } from "src/db/schema";

const client = new SQL(Bun.env.DATABASE_URL!);
const db = drizzle(client);

const SignUpUser = async (req: Request) => {
  const { name, username, password } = await req.json();
  const exists = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  if (exists) {
    return new Response("Username already exists", { status: 400 });
  }

  const newPassword = await Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 4,
    timeCost: 3,
  });
  await db.insert(users).values({ username, password: newPassword });
  return new Response("User created successfully", { status: 201 });
};

export default SignUpUser;
