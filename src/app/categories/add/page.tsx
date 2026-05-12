import { Metadata } from "next";
import CategoryForm from "../CategoryForm";

export const metadata: Metadata = {
  title: "Tambah Kategori - Frozeria",
};

export default function AddCategoryPage() {
  return <CategoryForm />;
}
