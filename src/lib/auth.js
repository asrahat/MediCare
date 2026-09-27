
import dns from "node:dns";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db(process.env.DB_NAME || "mediCareDB");

/*
|--------------------------------------------------------------------------
| Custom Roles
|--------------------------------------------------------------------------
|
| We use the BetterAuth Admin plugin's role system.
|
| Available roles:
| - admin
| - doctor
| - patient
|
*/

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

/*
|--------------------------------------------------------------------------
| Roles
|--------------------------------------------------------------------------
*/

const adminRole = ac.newRole({
  user: statement.user,
  session: statement.session,
});

const doctorRole = ac.newRole({});

const patientRole = ac.newRole({});

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
      /*
       * This is NOT the BetterAuth role.
       *
       * It is only used temporarily during registration
       * to tell the server which role the user selected.
       */
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
          /*
           * Get the requested role.
           */
          const requestedRole = user.accountType;

          /*
           * Normal registration:
           *
           * patient -> patient
           * doctor  -> doctor
           *
           * Never allow the client to create an admin.
           */
          if (
            requestedRole === "doctor" ||
            requestedRole === "patient"
          ) {
            return {
              data: {
                ...user,
                role: requestedRole,
              },
            };
          }

          /*
           * Google OAuth registration.
           *
           * New Google users become admin according
           * to your current requirement.
           */
          if (ctx.path === "/callback/:id") {
            return {
              data: {
                ...user,
                role: "admin",
              },
            };
          }

          /*
           * Safety fallback.
           */
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

