import { NextResponse } from "next/server";

export async function GET( context: { params: { labelId: string } }) {
  console.log("API called! Params:", context.params);

  const { labelId } = context.params;

  if (!labelId) {
    console.error("❌ Error: Label ID is missing!");
    return NextResponse.json({ error: "Label ID is required" }, { status: 400 });
  }

  try {
    // Construct the URL for ShipEngine API
    const url = `https://api.shipengine.com/v1/tracking?label_id=${labelId}`;
    console.log("Fetching from ShipEngine API:", url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SHIPENGINE_API_KEY}`,
      },
    });

    console.log("ShipEngine API Response:", response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ ShipEngine API Response Error:", errorText);
      throw new Error(`ShipEngine API error: ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Data fetched successfully:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching tracking info:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
