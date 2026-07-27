import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Custom logic if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin/login",
    }
  }
);

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/leads/:path*"],
};
