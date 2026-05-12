import { Metadata } from "next";
import CategoryForm from "../../CategoryForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Kategori - Frozeria",
};

export const dynamic = "force-dynamic";

export default async function EditCategoryPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    notFound();
  }

  return <CategoryForm initialData={category} />;
}
