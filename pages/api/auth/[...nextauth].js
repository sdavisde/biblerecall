import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const NextOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, user, token }) {
            session.id = token.id;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    }
}

export default NextAuth(NextOptions)

// 115323428404921571251