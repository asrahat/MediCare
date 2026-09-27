import dns from "node:dns";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db(process.env.DB_NAME || "mediCareDB");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      prompt: "select_account",
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "patient",
        input: false,
      },

      isBlocked: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
         
          if (ctx.path === "/callback/:id") {
            return {
              data: {
                ...user,
                role: "admin",
              },
            };
          }

          
          return {
            data: user,
          };
        },
      },
    },
  },

  plugins: [
    admin({
      defaultRole: "user",
    }),
  ],
});