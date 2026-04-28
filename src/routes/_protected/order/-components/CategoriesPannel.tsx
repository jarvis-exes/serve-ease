import Card from "@/components/common/Card";
import * as Accordion from "@radix-ui/react-accordion";
import { FaChevronDown } from "react-icons/fa";
import { useState, type FC } from "react";
import { twMerge } from "tailwind-merge";
import type { ItemType, OrderCategory, OrderSubCategory } from "@/models/menu.model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type CategoriesPannelProps = {
  selectItems: (items: ItemType[]) => void;
  categories?: OrderCategory[];
  isLoading: boolean;
};

const CategoriesPannel: FC<CategoriesPannelProps> = ({
  selectItems, categories, isLoading
}) => {

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);

  const handleSelect = (subCategory: OrderSubCategory) => {
    setSelectedSubCategoryId(subCategory._id);
    selectItems(subCategory.items);
  }

  return (
    <Card shadow="none" className={twMerge("flex-1 md:flex-3 min-w-1/2 md:min-w-fit p-0 pb-2 bg-linear-to-b from-slate-200 to-slate-100")}>
      <div className="h-full flex flex-col">
        <div className="px-3 pt-3 pb-2 rounded-t-2xl text-2xl text-slate-800">
          Categories
        </div>

        <Accordion.Root
          type="multiple"
          className="w-full h-full flex flex-col gap-2 p-2 overflow-auto"
        >
          {isLoading ? (
            <div>
              <Skeleton height={60} borderRadius={20} />
              <Skeleton height={60} borderRadius={20} />
              <Skeleton height={60} borderRadius={20} />
            </div>
          ) : (
            categories?.map((category) => (
              <Accordion.Item
                value={category._id}
                key={category._id}
                className="bg-white rounded-2xl"
              >
                <Accordion.Header className="group flex relative items-center">
                  <Accordion.Trigger
                    className="border-gray-300 flex gap-2 w-full items-center justify-between px-3 py-2 md:px-6 md:py-4 rounded-2xl hover:border-b-4 group-data-[state=open]:border-b-4 transition-all"
                  >
                    <span className="group-data-[state=closed]:truncate">{category.name}</span>
                    <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                  <ul className="flex flex-col gap-2 p-1 md:p-2">
                    {category.subCategories.map(subCategory =>
                      subCategory.isActive &&
                      <li
                        key={subCategory._id}
                        className={twMerge(
                          "px-3 py-2 pl-4 md:pl-8  md:py-4 rounded-2xl hover:bg-gray-100 cursor-pointer",
                          selectedSubCategoryId === subCategory._id
                            ? "bg-slate-200 border-b-4 border-gray-500 hover:bg-gray-200"
                            : "",
                        )}
                        onClick={() => handleSelect(subCategory)}
                      >{subCategory.name}</li>
                    )}
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
