import Button from "@/components/common/Button";
import { FaCheck, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState, type FC } from "react";
import Input from "@/components/common/Input";
import { useListSubCategories } from "../-query-hooks";
import Skeleton from "@/components/loaders/Skeleton";
import { twMerge } from "tailwind-merge";
import SwitchButton from "@/components/common/Switch";

type SubCategoriesProps = {
    categoryId: string;
    selectedSubCategoryId: string;
    setSelectedSubCategoryId: (id: string) => void;
}

const SubCategories: FC<SubCategoriesProps> = ({ categoryId, selectedSubCategoryId, setSelectedSubCategoryId }) => {
    const [addingSubCategory, setAddingSubCategory] = useState(false);

    const { data: subCategories } = useListSubCategories(categoryId);

    const handleAddSubCategory = () => {
        setAddingSubCategory(true);
    }

    const handleSelectItem = (subCategoryId: string) => {
        setSelectedSubCategoryId(subCategoryId);
    }

    return (
        <ul className="p-0 space-y-1">
            {
                subCategories ? subCategories.map(item => (
                    <li key={item._id}
                        className={twMerge("flex justify-between items-center pl-10 pr-15 rounded-2xl hover:bg-gray-100 cursor-pointer",
                            selectedSubCategoryId === item._id ? 'bg-gray-200 border-b-4 border-gray-500 hover:bg-gray-200' : '')
                        }
                        onClick={() => handleSelectItem(item._id)}
                    >
                        <span className="my-4">{item.name}</span>
                        <div className='flex items-center'>
                            <Button
                                color="transparent"
                                classes={twMerge("text-green-500",
                                    selectedSubCategoryId !== item._id ? 'hidden' : '')}
                            >
                                Edit
                            </Button>
                            <Button
                                color="transparent"
                                classes={twMerge("text-red-500",
                                    selectedSubCategoryId !== item._id ? 'hidden' : '')}
                            >
                                Delete
                            </Button>
                            <SwitchButton
                                name="isActive"
                                className=''
                                checked={item.isActive}
                                onChange={()=>item.isActive=false}
                            />
                        </div>
                    </li>
                )) :
                    <Skeleton height="h-10" rows={3} className="py-6 px-3" />
            }
            <li className='flex justify-center'>
                {addingSubCategory ?
                    <div className="flex w-full gap-5 mb-5 mx-5 items-center animate-in fade-in slide-in-from-top-2">
                        <Input
                            color="white"
                            placeholder="Enter sub category name"
                            inputClasses="h-12"
                        />
                        <FaCheck className="w-10 h-10 cursor-pointer text-green-500" />
                        <FaXmark className="w-10 h-10 cursor-pointer text-red-500" onClick={() => setAddingSubCategory(false)} />
                    </div> :
                    <Button
                        classes='text-green-dark text-md'
                        icon={<FaPlus />}
                        color='transparent'
                        onClick={() => handleAddSubCategory()}>
                        Add Sub Category
                    </Button>}
            </li>
        </ul>
    )
}

export default SubCategories