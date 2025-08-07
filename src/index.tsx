import { serve } from "bun";
import index from "./index.html";
import SignupUser from "./Backends/Signup";
import SigninUser from "./Backends/Signin";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    

    "/api/Signin": {
      
      async POST(req) {
        return SigninUser(req);
      },
    },
    "/api/Signup":{
      async POST(req) {
        return SignupUser(req);
      }
    }
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
