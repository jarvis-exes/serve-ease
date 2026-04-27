import Button from "@/components/common/Button";
import { FaCheck, FaEdit, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import Input from "@/components/common/Input";
import {
  useCreateSubCategory,
  useDeleteSubCategory,
  useListSubCategories,
  useUpdateSubCategory,
} from "../-query-hooks";
import { twMerge } from "tailwind-merge";
import SwitchButton from "@/components/common/Switch";
import type { SubCategoryType, UpdateSubCategoriesRequestType } from "@/models/menu.model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdDelete } from "react-icons/md";

type SubCategoriesProps = {
  categoryId: string;
  selectedSubCategory?: SubCategoryType;
  setSelectedSubCategory: Dispatch<SetStateAction<SubCategoryType | undefined>>;
};

const SubCategories: FC<SubCategoriesProps> = ({
  categoryId,
  selectedSubCategory,
  setSelectedSubCategory,
}) => {
  const [addingSubCategory, setAddingSubCategory] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: subCategories } = useListSubCategories(categoryId);
  const { mutateAsync: createSubCategory } = useCreateSubCategory();
  const { mutateAsync: deleteSubCategory } = useDeleteSubCategory();
  const { mutateAsync: updateSubCategory } = useUpdateSubCategory();

  const handleSelectItem = (subCategoryId: SubCategoryType) => {
    setSelectedSubCategory(subCategoryId);
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
    <ul className="p-2 flex flex-col gap-1">
      {subCategories ? (
        subCategories.map((item) => (
          <li
            key={item._id}
            className={twMerge(
              "flex justify-between items-center p-1 rounded-2xl hover:bg-gray-100 cursor-pointer",
              selectedSubCategory?._id === item._id
                ? "bg-gray-200 border-b-4 border-gray-500 hover:bg-gray-200"
                : "",
            )}
            onClick={() => handleSelectItem(item)}
          >
            {editingId && editingId === item._id ? (
              <div
                className="flex w-full gap-2 items-center animate-in fade-in slide-in-from-top-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Input
                  color="white"
                  placeholder="Enter category name"
                  inputClasses=""
                  id="categoryInput"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <div className="flex gap-2 items-center">
                  <FaCheck
                    className="w-8 h-8 cursor-pointer text-green-500"
                    onClick={() =>
                      handleUpdateSubCategory({ name, subCategoryId: item._id })
                    }
                  />
                  <FaXmark
                    className="w-10 h-10 cursor-pointer text-red-500"
                    onClick={() => setEditingId(null)}
                  />
                </div>
              </div>
            ) : (
              <span className="m-2">{item.name}</span>
            )}
            {!editingId && (
              <div
                className="flex gap-2 items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <FaEdit
                  className="h-5 w-full text-green"
                  onClick={() => {
                    setEditingId(item._id);
                    setName(item.name);
                  }}
                />
                <MdDelete
                  className="h-7 w-full text-red-500"
                  onClick={() => handleDeleteSubCategory(item._id)}
                />
                <SwitchButton
                  name="isActive"
                  className="mr-1"
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
        <div className="space-y-3 px-1 py-4">
          <Skeleton height={40} borderRadius={20} />
          <Skeleton height={40} borderRadius={20} />
          <Skeleton height={40} borderRadius={20} width={'70%'} />
        </div>
      )}
      <li className="flex justify-center">
        {addingSubCategory ? (
          <div className="flex w-full gap-2 px-1 items-center animate-in fade-in slide-in-from-top-2">
            <Input
              color="white"
              placeholder="Enter sub category name"
              inputClasses=""
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
            className="text-green-dark text-md"
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
