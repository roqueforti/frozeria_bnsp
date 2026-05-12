import { Metadata } from "next";
import ProductForm from "../ProductForm";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Tambah Barang - Frozeria",
};

export const dynamic = "force-dynamic";

export default async function AddProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <ProductForm categories={categories} />;
}
