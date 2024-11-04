import { getAllCategories, getAllTags } from "@/lib/post";

import CategoryList from "@/components/category-list";
import Empty from "@/components/empty";
import * as Layout from "@/components/layout";
import TagList from "@/components/tag-list";

export default async function NotFoundPage() {
  const tags = await getAllTags();
  const categories = await getAllCategories();
  return (
    <Layout.Root>
      <Layout.Side>
        <CategoryList categories={categories} currentCategory="All" />
        <TagList tags={tags} />
      </Layout.Side>
      <Layout.Main>
        <Empty />
      </Layout.Main>
    </Layout.Root>
  );
}
