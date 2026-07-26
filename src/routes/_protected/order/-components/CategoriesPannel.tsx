import Card from "@/components/common/Card";
import * as Accordion from "@radix-ui/react-accordion";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useState, type FC } from "react";
import { twMerge } from "tailwind-merge";
import type { ItemType, OrderCategory, OrderSubCategory } from "@/models/menu.model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type CategoriesPannelProps = {
  selectItems: (items: ItemType[]) => void;
  categories?: OrderCategory[];
  isLoading: boolean;
};

const STORAGE_KEY = "orderCategoriesOpenState";

const CategoriesPannel: FC<CategoriesPannelProps> = ({
  selectItems,
  categories,
  isLoading,
}) => {
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);

  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSelect = (subCategory: OrderSubCategory) => {
    setSelectedSubCategoryId(subCategory._id);
    selectItems(subCategory.items);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(openItems));
  }, [openItems]);

  return (
    <Card shadow="none" className={twMerge("min-w-1/2 md:min-w-1/4 max-w-12 p-0 pb-2 bg-linear-to-b from-slate-200 to-slate-100")}>
      <div className="h-full flex flex-col">
        <div className="px-3 pt-3 pb-2 rounded-t-2xl text-2xl text-slate-800 font-semibold">
          Categories
        </div>

        <Accordion.Root
          type="multiple"
          value={openItems}
          onValueChange={(value) => setOpenItems(value as string[])}
          className="w-full h-full flex flex-col gap-2 p-2 overflow-auto"
        >
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton height={60} borderRadius={20} />
              <Skeleton height={60} borderRadius={20} />
              <Skeleton height={60} borderRadius={20} />
            </div>
          ) : (
            categories?.map((category) => (
              <Accordion.Item
                value={category._id}
                key={category._id}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <Accordion.Header className="group flex relative items-center">
                  <Accordion.Trigger
                    className="flex gap-2 w-full items-center justify-between px-3 py-2 md:px-6 md:py-4 rounded-2xl hover:shadow-[0_4px_0_0_#d1d5db] group-data-[state=open]:shadow-[0_4px_0_0_#d1d5db] transition-all"
                  >
                    <span className="group-data-[state=closed]:truncate">{category.name}</span>
                    <FaChevronDown className="transition-transform shrink-0 duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                  <ul className="flex flex-col gap-2 p-1 pt-2 md:p-2">
                    {category.subCategories
                      ?.filter((sub) => sub.isActive)
                      .map((subCategory) => (
                        <li
                          key={subCategory._id}
                          className={twMerge(
                            "px-3 py-2 pl-4 md:pl-8 md:py-4 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors",
                            selectedSubCategoryId === subCategory._id
                              ? "bg-slate-200 border-b-4 border-gray-500 hover:bg-gray-200"
                              : ""
                          )}
                          onClick={() => handleSelect(subCategory)}
                        >
                          {subCategory.name}
                        </li>
                      ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            ))
          )}
        </Accordion.Root>
      </div>
    </Card>
  );
};

export default CategoriesPannel;