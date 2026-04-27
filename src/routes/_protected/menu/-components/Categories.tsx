import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import * as Accordion from "@radix-ui/react-accordion";
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import Input from "@/components/common/Input";
import {
  useCreateCategory,
  useDeleteCategory,
  useListCategories,
  useUpdateCategory,
} from "../-query-hooks";
import SubCategories from "./SubCategories";
import SwitchButton from "@/components/common/Switch";
import type { SubCategoryType, UpdateCategoriesRequestType } from "@/models/menu.model";
import { getOutletId } from "@/utils/tokens";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type CategoriesProps = {
  setSelectedSubCategory: Dispatch<SetStateAction<SubCategoryType | undefined>>;
  selectedSubCategory?: SubCategoryType;
};

const Categories: FC<CategoriesProps> = ({
  setSelectedSubCategory,
  selectedSubCategory,
}) => {
  const outletId = getOutletId();

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
    <Card shadow="none" className="flex-5 p-2 md:p-4 bg-slate-200">
      <div className="h-full flex flex-col gap-2 md:gap-4">
        <div className="flex justify-between items-centerS">
          <div className="flex items-center text-xl font-bold">
            Categories({totalCategories})
          </div>
          <Button
            icon={<FaPlus />}
            onClick={() => setAddingCategory(true)}
            color="dark"
          >
            Add
          </Button>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="w-full h-full overflow-auto flex flex-col gap-2"
        >
          {addingCategory && (
            <div className="flex gap-5 mb-3 items-center animate-in fade-in slide-in-from-top-2">
              <Input
                color="white"
                placeholder="Enter category name"
                inputClasses="h-12"
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
            <div className="space-y-3 px-1 py-4">
              <Skeleton height={60} borderRadius={20} />
              <Skeleton height={60} borderRadius={20} />
              <Skeleton height={60} borderRadius={20} width={"70%"} />
            </div>
          ) : (
            categories?.map((item) => (
              <Accordion.Item
                value={item._id}
                key={item._id}
                className="bg-white rounded-2xl"
                disabled={!item.isActive}
              >
                <Accordion.Header className="relative group flex items-center">
                  <Accordion.Trigger
                    className="flex w-full items-center justify-between p-2 pr-4 rounded-2xl 
                              hover:shadow-[0_4px_0_0_#d1d5db] group-data-[state=open]:shadow-[0_4px_0_0_#d1d5db] transition-all"
                    onClick={() => setCategoryId(item._id)}
                  >
                    {editingId === item._id ?        
                        <Input
                          color="white"
                          placeholder="Enter category name"
                          containerClasses=" mr-20 items-center animate-in fade-in slide-in-from-top-2"
                          id="categoryInput"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          onClick={(e) => e.stopPropagation()}
                        />                      
                     : (
                      <span className="m-2 md:ml-4">{item.name}</span>
                    )}

                    <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>

                  <SwitchButton
                    name="isActive"
                    className="absolute end-12 md:end-15"
                    checked={item.isActive}
                    onChange={() =>
                      handleUpdateCategory({
                        isActive: !item.isActive,
                        categoryId: item._id,
                      })
                    }
                  />

                </Accordion.Header>

                <Accordion.Content className="overflow-hidden transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                  <div
                    className="flex gap-2 w-full justify-center px-2 pt-3 pb-0 items-center"
                  >
                    <div className="text-green-500 w-full h-10 bg-green-100 rounded-full p-2 flex items-center cursor-pointer">
                      {editingId === item._id ?
                        <div
                          className="cursor-pointer w-full flex items-center justify-center gap-2 font-bold text-lg"
                          onClick={() =>
                            handleUpdateCategory({
                              name,
                              categoryId: item._id,
                            })
                          }>
                          <FaCheck
                            className="w-5 h-5"
                          />
                          <span>Save</span>
                        </div>
                        : <FaEdit
                          className="h-6 w-full"
                          onClick={() => {
                            setEditingId(item._id);
                            setName(item.name);
                          }}
                        />
                      }
                    </div>
                    <div className=" text-red-500 bg-red-100 rounded-full w-full h-10 p-2 flex items-center cursor-pointer">
                      {editingId === item._id ?
                        <div
                          className="cursor-pointer w-full flex items-center justify-center gap-2 font-bold text-lg"
                          onClick={() => setEditingId(null)}>
                          <FaXmark
                            className="w-6 h-6"
                          />
                          <span>Cancel</span>
                        </div>
                        : <MdDelete
                          className="h-8 w-full"
                          onClick={() => handleDeleteCategory(item._id)}
                        />
                      }
                    </div>
                  </div>
                  <SubCategories
                    categoryId={categoryId}
                    selectedSubCategory={selectedSubCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
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
