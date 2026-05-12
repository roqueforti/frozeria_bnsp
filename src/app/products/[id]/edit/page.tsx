import { Metadata } from "next";
import ProductForm from "../../ProductForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Barang - Frozeria",
};

export const dynamic = "force-dynamic";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  // Convert Decimals to string or number before passing to client
  const productData = {
    ...product,
    sellPrice: Number(product.sellPrice),
    buyPrice: Number(product.buyPrice),
  };

  return <ProductForm categories={categories} initialData={productData} />;
}
