import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // ٹوکن چیک کریں (یہ سب سے اہم لائن ہے)
  // یہ چیک کرتا ہے کہ کیا براؤزر میں لاگ ان کی کوکی موجود ہے؟
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // 1. اگر یوزر "ایڈمن پینل" کی طرف جا رہا ہے اور اس کے پاس ٹوکن نہیں ہے
  if (path.startsWith("/admin") && !token) {
    // تو اسے فوراً لاگ ان پیج پر بھیج دو
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. اگر یوزر "لاگ ان پیج" پر ہے لیکن وہ پہلے سے لاگ ان ہے (ٹوکن موجود ہے)
  if (path === "/login" && token) {
    // تو اسے دوبارہ لاگ ان مت کرنے دو، سیدھا ڈیش بورڈ بھیج دو
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // باقی سب ٹھیک ہے، یوزر کو جانے دو
  return NextResponse.next();
}

// کن کن راستوں پر یہ سیکیورٹی چیک لگنا چاہیے؟
export const config = {
  matcher: [
    "/admin/:path*", // ایڈمن کے تمام پیجز کو لاک کرو
    "/login",        // لاگ ان پیج پر بھی نظر رکھو (تاکہ ڈبل لاگ ان نہ ہو)
  ],
};