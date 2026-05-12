import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Convert numeric fields
    const stock = parseInt(data.stock, 10) || 0;
    const minStock = parseInt(data.minStock, 10) || 20;
    const sellPrice = parseFloat(data.sellPrice) || 0;
    const buyPrice = parseFloat(data.buyPrice) || 0;

    const product = await prisma.product.update({
      where: { id },
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
    console.error("Failed to update product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

