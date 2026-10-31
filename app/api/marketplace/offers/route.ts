import { NextRequest, NextResponse } from "next/server";
import { loadMarketplace } from "@/lib/provider-marketplace";
import { unstable_cache } from "next/cache";

const cachedMarketplace = unstable_cache(loadMarketplace, ["pincode-provider-marketplace-v1"], { revalidate: 900 });

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function GET(request:NextRequest){
  const kind=request.nextUrl.searchParams.get("kind");
  if(kind!=="hosting"&&kind!=="domain")
    return NextResponse.json({error:"kind must be hosting or domain"},{status:400});
  try {
    const data=await cachedMarketplace(kind);
    return NextResponse.json(data,{
      headers:{"Cache-Control":"public, max-age=0, s-maxage=900, stale-while-revalidate=1800",
        "X-Content-Type-Options":"nosniff"}
    });
  }catch{
    return NextResponse.json({error:"Offers are temporarily unavailable. Open provider sites for current pricing."},{
      status:503,headers:{"Cache-Control":"no-store"}
    });
  }
}
