const fs = require('fs');
let content = fs.readFileSync('src/app/api/auth/[...nextauth]/route.js', 'utf8');

// The file looks like:
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// 
// const prisma = new PrismaClient();
// 
// export const authOptions = { ... }
// 
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

content = content.replace(/import CredentialsProvider[\s\S]*?const prisma = new PrismaClient\(\);\n\nexport const authOptions = \{[\s\S]*?  \},\n\};\n/m, 'import { authOptions } from "@/lib/auth";\n');

fs.writeFileSync('src/app/api/auth/[...nextauth]/route.js', content);
