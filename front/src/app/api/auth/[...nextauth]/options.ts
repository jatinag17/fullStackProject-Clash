import { AuthOptions, ISODateString,User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import { LOGIN_URL } from "@/lib/apiEndPoints";


export type CustomSession={
    user?:CustomUser;
    expires:ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null;
};


export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user:CustomUser;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
          const { data } = await axios.post(LOGIN_URL, credentials);
          const user = data?.data;
        if (user) {
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
};