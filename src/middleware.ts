import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { currencyForCountry, GEO_COOKIE } from "./lib/fx/currencies";

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = handleI18n(request);

  // Preselect a display currency from Cloudflare's geo header. This is only a
  // preselection: an explicit choice from the switcher lives in a separate
  // cookie and always wins, and EUR remains the contractual currency either way.
  //
  // Written only when it would actually change, because a `Set-Cookie` on an
  // otherwise static HTML response makes CDNs skip their cache. That way only
  // the first response for a visitor carries the header.
  const currency = currencyForCountry(request.headers.get("cf-ipcountry"));
  if (request.cookies.get(GEO_COOKIE)?.value !== currency) {
    response.cookies.set(GEO_COOKIE, currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals (_next)
  // - static files (containing a dot, e.g. favicon.ico, images)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
