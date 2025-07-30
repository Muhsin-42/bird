// import { authMiddleware } from "@clerk/nextjs";

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default authMiddleware({
//     publicRoutes: ['/','/api/webhook/clerk'],
//     ignoredRoutes: ['/api/webhook/clerk']
// });

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };

import { withClerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default withClerkMiddleware(() => {
  //console.log("middleware running...");
  return NextResponse.next();
});

export const config = {
  matcher: ['/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)', '/'],
};
