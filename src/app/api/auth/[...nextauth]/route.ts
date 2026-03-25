import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days session
  },

  // یہ بہت ضروری ہے، ورسل اس کے بغیر لاگ ان نہیں ہونے دیتا
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. کیا ای میل اور پاسورڈ لکھا بھی ہے؟
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // 2. ڈیٹا بیس کنیکٹ کرو
        await connectDB();

        // 3. یوزر ڈھونڈو (چھوٹے حروف میں کنورٹ کر کے)
        const user = await User.findOne({
          email: credentials.email.toLowerCase()
        });

        if (!user) throw new Error("No user found");

        // 4. پاسورڈ میچ کرو
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // 5. سب ٹھیک ہے، یوزر کا ڈیٹا واپس کرو
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
        };
      },
    }),
  ],

  callbacks: {
    // جب ٹوکن بنے تو اس میں یوزر کا رول (Role) اور آئی ڈی ڈال دو
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // جب سیشن بنے تو وہ ٹوکن والا ڈیٹا سیشن میں ڈال دو
    async session({ session, token }: any) {
      if (session?.user && token) {
        // @ts-ignore
        session.user.role = token.role;
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  // ✅ سب سے اہم حصہ: کوکیز کی سیٹنگ
  // یہ یقینی بناتا ہے کہ Middleware کو ہمیشہ صحیح کوکی ملے
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});

export { handler as GET, handler as POST };