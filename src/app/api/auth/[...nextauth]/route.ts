import  connectDB  from "@/app/libs/mongoDB";
import Usuario from "@/app/models/usuario";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        correo: { label: "Correo", type: "text", placeholder: "tu@correo.com" },
        contrasena: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const usuario = await Usuario.findOne({
          correo: credentials?.correo,
        }).select("+contrasena");

        if (!usuario) throw new Error("Credenciales inválidas");

        const passwordMatch = await bcrypt.compare(
          credentials!.contrasena,
          usuario.contrasena
        );

        if (!passwordMatch) throw new Error("Credenciales inválidas");

        const { _id, nombre, correo, tipo } = usuario;

        return { id: _id.toString(), nombre, correo, tipo };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Puedes personalizar esta ruta
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
