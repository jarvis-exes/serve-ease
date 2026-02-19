import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import * as Accordion from "@radix-ui/react-accordion";
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState, type FC } from "react";
import Input from "@/components/common/Input";
import {
  useCreateCategory,
  useDeleteCategory,
  useListCategories,
  useUpdateCategory,
} from "../-query-hooks";
import Skeleton from "@/components/loaders/Skeleton";
import SubCategories from "./SubCategories";
import SwitchButton from "@/components/common/Switch";
import type { UpdateCategoriesRequestType } from "@/models/menu.model";

type CategoriesProps = {
  setSelectedSubCategoryId: (id: string) => void;
  selectedSubCategoryId: string;
};

const Categories: FC<CategoriesProps> = ({
  setSelectedSubCategoryId,
  selectedSubCategoryId,
}) => {
  const outletId = "696656b3646f68216ea092c8";

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: categories, isLoading: isCategoriesLoading } =
    useListCategories(outletId);
  const { mutateAsync: createCategory } = useCreateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const { mutateAsync: updateCategory } = useUpdateCategory();

  const totalCategories = categories?.length;

  const handleAddCategory = () => {
    createCategory({
      outletId,
      name,
      isActive: true,
      sequence: (categories?.length ?? 0) + 1,
    });
    setAddingCategory(false);
    setName("");
  };

  const handleUpdateCategory = (
    payload: Partial<UpdateCategoriesRequestType>,
  ) => {
    updateCategory(payload);
    setEditingId(null);
    setName("");
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  return (
    <Card classes="flex-5 p-0">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center bg-green-light px-7 py-2 rounded-t-2xl">
          <div className="text-xl font-bold">Categories({totalCategories})</div>
          <Button
            icon={<FaPlus />}
            color="transparent"
            onClick={() => setAddingCategory(true)}
          >
            Add Category
          </Button>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="w-full h-full px-5 py-2 overflow-auto "
        >
          {addingCategory && (
            <div className="flex gap-5 my-5 items-center animate-in fade-in slide-in-from-top-2">
              <Input
                color="white"
                placeholder="Enter category name"
                inputClasses="h-14"
                id="categoryInput"
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex gap-2 items-center">
                <FaCheck
                  className="w-10 h-10 cursor-pointer text-green-500"
                  onClick={() => handleAddCategory()}
                />
                <FaXmark
                  className="w-12 h-12 cursor-pointer text-red-500"
                  onClick={() => setAddingCategory(false)}
                />
              </div>
            </div>
          )}

          {isCategoriesLoading ? (
            <Skeleton height="h-15" rows={5} className="py-6 px-3" />
          ) : (
            categories?.map((item) => (
              <Accordion.Item
                value={item._id}
                key={item._id}
                className="space-y-2"
                disabled={!item.isActive}
              >
                <Accordion.Header className="group flex relative items-center">
                  <Accordion.Trigger
                    className=" border-b-4 border-gray-300 flex w-full items-center justify-between px-6 py-4 rounded-2xl hover:bg-gray-100"
                    onClick={() => {
                      setCategoryId(item._id);
                    }}
                  >
                    {editingId && editingId === item._id ? (
                      <div
                        className="flex w-full gap-5 mr-5 items-center animate-in fade-in slide-in-from-top-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Input
                          color="white"
                          placeholder="Enter category name"
                          inputClasses="h-12"
                          id="categoryInput"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                        <div className="flex gap-2 items-center">
                          <FaCheck
                            className="w-10 h-10 cursor-pointer text-green-500"
                            onClick={() =>
                              handleUpdateCategory({
                                name,
                                categoryId: item._id,
                              })
                            }
                          />
                          <FaXmark
                            className="w-12 h-12 cursor-pointer text-red-500"
                            onClick={() => setEditingId(null)}
                          />
                        </div>
                      </div>
                    ) : (
                      <span>{item.name}</span>
                    )}

                    <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>

                  <div className="flex items-center absolute end-15">
                    {!editingId && (
                      <div
                        className="flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          color="transparent"
                          classes=" text-green-500 group-data-[state=closed]:hidden"
                          onClick={() => {
                            setEditingId(item._id);
                            setName(item.name);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="transparent"
                          classes=" text-red-500 group-data-[state=closed]:hidden"
                          onClick={() => handleDeleteCategory(item._id)}
                        >
                          Delete
                        </Button>
                        <SwitchButton
                          name="isActive"
                          className=""
                          checked={item.isActive}
                          onChange={() =>
                            handleUpdateCategory({
                              isActive: !item.isActive,
                              categoryId: item._id,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                  <SubCategories
                    categoryId={categoryId}
                    selectedSubCategoryId={selectedSubCategoryId}
                    setSelectedSubCategoryId={setSelectedSubCategoryId}
                  />
                </Accordion.Content>
              </Accordion.Item>
            ))
          )}
        </Accordion.Root>
      </div>
    </Card>
  );
};

export default Categories;
