type SubCategoryProps = { children: string };
type CategoryCardProps = {
  title: string;
  subCategories: Array<{ id: number; name: string }>;
};

export default function CategoryCard({
  title,
  subCategories,
}: CategoryCardProps) {
  return (
    <div className="p-3 border border-slate-100 shadow rounded">
      <h3 className="text-base font-medium leading-5">{title}</h3>
      {subCategories.length > 0 && (
        <div className="mt-2 inline-flex flex-wrap gap-2 w-full pt-3 border-t border-slate-200">
          {subCategories.map((item) => (
            <SubCategory key={item.id}>{item.name}</SubCategory>
          ))}
        </div>
      )}
    </div>
  );
}

const SubCategory = ({ children }: SubCategoryProps) => {
  return (
    <div className="border border-slate-200 rounded-3xl py-1 px-3">
      <h4 className="text-sm font-normal leading-4">{children}</h4>
    </div>
  );
};
