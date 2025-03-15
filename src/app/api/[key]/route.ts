import { db } from "~/server/db";
import { NextResponse } from "next/server"; // Using NextResponse for API routes

export async function GET(req: Request) {
  const key = req.url.split("/")[4]; // Assuming you're extracting the key from the URL

  const keyCheck = await db.key.findFirst({
    where: {
      id: key,
    },
  });

  if (!keyCheck) {
    return NextResponse.json({ error: "Invalid key", status: 400 });
  }

  if (keyCheck.keyType === "RANDOM") {
    if (keyCheck.numberType === "INTEGER") {
      return NextResponse.json(
        Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER * 2 + 1)) -
          Number.MAX_SAFE_INTEGER,
      );
    } else {
      const magnitude = Math.floor(Math.random() * 300) - 150;
      const randomValue =
        Math.random() * 10 ** magnitude * (Math.random() > 0.5 ? 1 : -1);
      return NextResponse.json(randomValue);
    }
  } else {
    if (keyCheck.numberType === "INTEGER") {
      return NextResponse.json(
        Math.floor(
          Math.random() *
            (Number(keyCheck.upperBound) - Number(keyCheck.lowerBound)) +
            Number(keyCheck.lowerBound),
        ),
      );
    } else {
      const magnitude = Math.floor(Math.random() * 300) - 150;
      const randomValue =
        Math.random() *
          (Number(keyCheck.upperBound) - Number(keyCheck.lowerBound)) +
        Number(keyCheck.lowerBound);
      return NextResponse.json(randomValue);
    }
  }
}
