import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Convert numeric fields
    const stock = parseInt(data.stock, 10) || 0;
    const minStock = parseInt(data.minStock, 10) || 20;
    const sellPrice = parseFloat(data.sellPrice) || 0;
    const buyPrice = parseFloat(data.buyPrice) || 0;

    const product = await prisma.product.create({
      data: {
        name: data.name,
        categoryId: data.categoryId || null,
        stock,
        minStock,
        unit: data.unit,
        sellPrice,
        buyPrice,
        weightSize: data.weightSize,
        storageLocation: data.storageLocation,
        description: data.description,
        photoUrl: data.photoUrl,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
