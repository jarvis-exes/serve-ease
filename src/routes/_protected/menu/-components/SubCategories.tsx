import Button from "@/components/common/Button";
import { FaCheck, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState, type FC } from "react";
import Input from "@/components/common/Input";
import {
  useCreateSubCategory,
  useDeleteSubCategory,
  useListSubCategories,
  useUpdateSubCategory,
} from "../-query-hooks";
import Skeleton from "@/components/loaders/Skeleton";
import { twMerge } from "tailwind-merge";
import SwitchButton from "@/components/common/Switch";
import type { UpdateSubCategoriesRequestType } from "@/models/menu.model";

type SubCategoriesProps = {
  categoryId: string;
  selectedSubCategoryId: string;
  setSelectedSubCategoryId: (id: string) => void;
};

const SubCategories: FC<SubCategoriesProps> = ({
  categoryId,
  selectedSubCategoryId,
  setSelectedSubCategoryId,
}) => {
  const [addingSubCategory, setAddingSubCategory] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: subCategories } = useListSubCategories(categoryId);
  const { mutateAsync: createSubCategory } = useCreateSubCategory();
  const { mutateAsync: deleteSubCategory } = useDeleteSubCategory();
  const { mutateAsync: updateSubCategory } = useUpdateSubCategory();

  const handleSelectItem = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
  };
  const handleAddSubCategory = () => {
    createSubCategory({
      categoryId,
      name,
      isActive: true,
      sequence: (subCategories?.length ?? 0) + 1,
    });
    setAddingSubCategory(false);
    setName("");
  };

  const handleUpdateSubCategory = (
    payload: Partial<UpdateSubCategoriesRequestType>,
  ) => {
    updateSubCategory({ payload, categoryId });
    setEditingId(null);
    setName("");
  };

  const handleDeleteSubCategory = (subCategoryId: string) => {
    deleteSubCategory({ subCategoryId, categoryId });
  };

  return (
    <ul className="p-0 space-y-1">
      {subCategories ? (
        subCategories.map((item) => (
          <li
            key={item._id}
            className={twMerge(
              "flex justify-between items-center pl-10 pr-15 py-2 rounded-2xl hover:bg-gray-100 cursor-pointer",
              selectedSubCategoryId === item._id
                ? "bg-gray-200 border-b-4 border-gray-500 hover:bg-gray-200"
                : "",
            )}
            onClick={() => handleSelectItem(item._id)}
          >
            {editingId && editingId === item._id ? (
              <div
                className="flex w-full gap-5 items-center animate-in fade-in slide-in-from-top-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Input
                  color="transparent"
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
                      handleUpdateSubCategory({ name, subCategoryId: item._id })
                    }
                  />
                  <FaXmark
                    className="w-12 h-12 cursor-pointer text-red-500"
                    onClick={() => setEditingId(null)}
                  />
                </div>
              </div>
            ) : (
              <span className="">{item.name}</span>
            )}
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
                  onClick={() => handleDeleteSubCategory(item._id)}
                >
                  Delete
                </Button>
                <SwitchButton
                  name="isActive"
                  className=""
                  checked={item.isActive}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={() =>
                    handleUpdateSubCategory({
                      isActive: !item.isActive,
                      subCategoryId: item._id,
                    })
                  }
                />
              </div>
            )}
          </li>
        ))
      ) : (
        <Skeleton height="h-10" rows={3} className="py-6 px-3" />
      )}
      <li className="flex justify-center">
        {addingSubCategory ? (
          <div className="flex w-full gap-5 my-4 items-center animate-in fade-in slide-in-from-top-2">
            <Input
              color="white"
              placeholder="Enter sub category name"
              inputClasses="h-14"
              id="subCategoryInput"
              onChange={(e) => setName(e.target.value)}
            />
            <FaCheck
              className="w-10 h-10 cursor-pointer text-green-500"
              onClick={() => handleAddSubCategory()}
            />
            <FaXmark
              className="w-10 h-10 cursor-pointer text-red-500"
              onClick={() => setAddingSubCategory(false)}
            />
          </div>
        ) : (
          <Button
            classes="text-green-dark text-md"
            icon={<FaPlus />}
            color="transparent"
            onClick={() => setAddingSubCategory(true)}
          >
            Add Sub Category
          </Button>
        )}
      </li>
    </ul>
  );
};

export default SubCategories;
