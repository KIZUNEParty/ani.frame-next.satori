import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const width = Number(searchParams.get("width")) || 1920;
  const height = Number(searchParams.get("height")) || 1080;
  const opacity =
    searchParams.get("opacity") != null
      ? Math.floor(Number(searchParams.get("opacity")) / 10) / 10
      : 1;
  const blur =
    searchParams.get("blur") != null
      ? `${Number(searchParams.get("blur")) * 6}px`
      : "0";

  console.log(`${width} -- ${height} -- ${opacity} -- ${blur}`);

  const dataCall = await fetch(`https://frame.caffe.quest/rdm`, {
    cache: "no-store",
  });

  const img = await dataCall.json();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          background: "#2e2f2f",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.url}
          tw="w-full h-full"
          style={{ opacity: opacity, filter: `blur(${blur})` }}
        />
      </div>
    ),
    {
      width: width,
      height: height,
    }
  );
}
