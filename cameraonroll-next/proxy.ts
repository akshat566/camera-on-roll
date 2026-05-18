import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const hasClerk = !!process.env.CLERK_SECRET_KEY;

const isProtectedRoute = createRouteMatcher([
  '/atom(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!hasClerk) return;
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
