
import dns from "node:dns";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db(process.env.DB_NAME || "mediCareDB");

const statement = {
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "impersonate-admins",
    "delete",
    "set-password",
    "set-email",
    "get",
    "update",
  ],

  session: [
    "list",
    "revoke",
    "delete",
  ],
};

const ac = createAccessControl(statement);

const adminRole = ac.newRole({
  user: statement.user,
  session: statement.session,
});

const doctorRole = ac.newRole({});

const patientRole = ac.newRole({});

export const auth = betterAuth({
  
  baseURL: process.env.BETTER_AUTH_URL,

  
  trustedOrigins: [
    "http://localhost:3000",
    process.env.CLIENT_URI,
  ].filter(Boolean),

  
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
      accountType: {
        type: "string",
        required: false,
        input: true,
        returned: false,
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
          const requestedRole = user.accountType;

          // Doctor registration
          if (requestedRole === "doctor") {
            return {
              data: {
                ...user,
                role: "doctor",
              },
            };
          }

          // Patient registration
          if (requestedRole === "patient") {
            return {
              data: {
                ...user,
                role: "patient",
              },
            };
          }

          // Google callback
          if (ctx.path === "/callback/:id") {
            return {
              data: {
                ...user,
                role: "admin",
              },
            };
          }

          // Default role
          return {
            data: {
              ...user,
              role: "patient",
            },
          };
        },
      },
    },
  },

  
  plugins: [
    admin({
      defaultRole: "patient",

      ac,

      roles: {
        admin: adminRole,
        doctor: doctorRole,
        patient: patientRole,
      },

      adminRoles: ["admin"],
    }),
  ],
});

