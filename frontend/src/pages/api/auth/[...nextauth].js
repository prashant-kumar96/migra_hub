import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, account,profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.googleId = profile.sub
      }
      return token;
    },
    // async redirect({ url, baseUrl }) {
    //   return "http://localhost:3000/dashboard";
    // },
    async session({ session, token }) {
        session.accessToken = token.accessToken;
        session.user.googleId = token.googleId;

      return session;
    },
     async signIn({ user, account, profile }) {
        
       return true // if true allow sign in if false reject
    },

  },
};


export default NextAuth(authOptions);