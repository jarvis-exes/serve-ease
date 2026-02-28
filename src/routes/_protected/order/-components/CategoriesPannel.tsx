import Card from "@/components/common/Card";
import * as Accordion from "@radix-ui/react-accordion";
import { FaChevronDown } from "react-icons/fa";
import { useState, type FC } from "react";
import Skeleton from "@/components/loaders/Skeleton";
import { getOutletId } from "@/utils/tokens";
import { useGetMenu } from "../-query-hooks";
import { twMerge } from "tailwind-merge";
import type { ItemType, OrderSubCategory } from "@/models/menu.model";

type CategoriesPannelProps = {
  selectItems: (items: ItemType[]) => void;
};

const CategoriesPannel: FC<CategoriesPannelProps> = ({
  selectItems
}) => {

  const outletId = getOutletId();
  const { data, isLoading } = useGetMenu(outletId);

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);

  const categories = data?.categories;

  const handleSelect = (subCategory: OrderSubCategory) => {
    setSelectedSubCategoryId(subCategory._id);
    selectItems(subCategory.items);
  }


  return (
    <Card className="flex-3 p-0">
      <div className="h-full flex flex-col">
        <div className="bg-green-light px-7 py-2 rounded-t-2xl text-xl font-bold">
          Categories
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="w-full h-full px-3 py-2 overflow-auto "
        >
          {isLoading ? (
            <Skeleton height="h-15" rows={5} className="py-6 px-3" />
          ) : (
            categories?.map((category) => (
              category.isActive && <Accordion.Item
                value={category._id}
                key={category._id}
                className="space-y-1"
              >
                <Accordion.Header className="group flex relative items-center">
                  <Accordion.Trigger
                    className=" border-b-4 border-gray-300 flex w-full items-center justify-between px-6 py-4 rounded-2xl hover:bg-gray-100"
                  >
                    <span>{category.name}</span>
                    <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden mb-1 transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                  <ul className="space-y-1">
                    {category.subCategories.map(subCategory =>
                      subCategory.isActive &&
                      <li
                        key={subCategory._id}
                        className={twMerge(
                          "pl-10 pr-15 py-4 rounded-2xl hover:bg-gray-100 cursor-pointer",
                          selectedSubCategoryId === subCategory._id
                            ? "bg-gray-200 border-b-4 border-gray-500 hover:bg-gray-200"
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
