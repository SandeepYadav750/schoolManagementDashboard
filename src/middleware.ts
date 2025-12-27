import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/setting";
import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher(['/admin', '/teacher'])

const matchers = Object.keys(routeAccessMap).map((pattern) => ({
  matcher: createRouteMatcher([pattern]),
  allowedRoles: routeAccessMap[pattern],
}));

console.log("matchers", matchers);

// export default clerkMiddleware(async (auth, req) => {
//   //   if (isProtectedRoute(req)) await auth.protect();

//   const { sessionClaims } = await auth();
//   // console.log("sessionClaims",sessionClaims)

//   const userRole = (sessionClaims?.metadata as { role?: string })?.role;
//   for (const { matcher, allowedRoles } of matchers) {
//     if (matcher(req) && !allowedRoles.includes(userRole!)) {
//       return NextResponse.redirect(new URL(`/${userRole}`, req.url));
//     }
//   }
// });

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, userId } = await auth();

  if (!userId) return;

    const userRole = (sessionClaims?.metadata as { role?: string })?.role;

  if (!userRole) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }
  }
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
