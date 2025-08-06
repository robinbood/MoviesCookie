import { redis, SQL } from "bun";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/bun-sql";
import { users } from "src/db/schema";
import { RedisClient } from "bun";
const Redus = new RedisClient(Bun.env.REDIS_URL!);
const client = new SQL(Bun.env.DATABASE_URL!);
const db = drizzle({ client });

const SigninUser = async (req: Request) => {
  const { username, password } = await req.json();

  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (!user[0]) {
    return new Response("Username Doesn't exist", { status: 401 });
  }
  const isMatch = await Bun.password.verify(password, user[0].password);
  if (!isMatch) {
    return new Response("Invalid Credentials", { status: 401 });
  }
  const sessionID = Bun.randomUUIDv7();
  const key = `session:${sessionID}`;

  await Redus.hmset(key, [
    "userId",
    user[0].id.toString(),
    "created",
    Date.now().toString(),
  ]);

  await Redus.expire(key, 1289000);

  return new Response(
    JSON.stringify({
      message: `Welcome ${user[0].name}`,
      name: user[0].username,
    }),
    {
      status: 200,
      headers: {
        "Content-type": "application/json",
        "Set-Cookie": `sessionId=session:${sessionID}; HttpOnly; Secure; SameSite-Strict; Path=/;`,
      },
    }
  );
};

export default SigninUser;

export const verifySession = async (req: Request) => {
  const cookie = req.headers?.get("cookie");
  if (!cookie) {
    return new Response("No session found", { status: 401 });
  }
  const sessionId = cookie.split("=")[1].split(";")[0];
  if (!sessionId) return null;

  try {
    const [userId, created] = await Redus.hmget(sessionId, [
      "userId",
      "created",
    ]);
    return {
      userId: Number(userId),
      created: Number(created),
    };
  } catch (error: unknown) {
    console.error("Auth Error", error);
    return null;
  }
};

export const SignoutUser = async (req: Request) => {
  const cookie = req.headers.get("cookie");
  const sessionId = cookie?.split("=")[1].split(";")[0];
  const cookieHeader =
    "sessionId=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0";
  if (!sessionId) {
    return new Response(
      JSON.stringify({
        message: "No active session found",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookieHeader,
        },
      }
    );
   
  }
  try {
    const exists = await Redus.exists(sessionId)
    if (exists) {
        await Redus.del(sessionId )
        return new Response(JSON.stringify({
            message:"Bye bye"
        }),{
            status:200,
            headers:{
                "Content-type":"application/json",
                "Set-Cookie":cookieHeader
            }
        })
    }
    
  } catch (error:unknown) {
    console.error("Signout Error",error);
    
  }
};
