import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import FormSwitch from "@/components/common/FormSwitch";
import * as Accordion from '@radix-ui/react-accordion'
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import type { CreateCategoriesRequestType, MenuFormValues } from "@/models/menu.model";
import { useState, type FC } from "react";
import Input from "@/components/common/Input";
import { useListCategories, useListSubCategories } from "../-query-hooks";
import Skeleton from "@/components/loaders/Skeleton";
import { twMerge } from "tailwind-merge";

type CategoriesProps = {
    setSelectedSubCategoryId: (id: string) => void;
    selectedSubCategoryId: string;
}

const Categories: FC<CategoriesProps> = ({ setSelectedSubCategoryId, selectedSubCategoryId }) => {

    const [addingCategory, setAddingCategory] = useState(false);
    const [addingSubCategory, setAddingSubCategory] = useState(false);
    const [categoryId, setCategoryId] = useState('');

    const outletId = '696656b3646f68216ea092c8';

    const { data: categories, isLoading: isCategoriesLoading } = useListCategories(outletId);
    const { data: subCategories } = useListSubCategories(categoryId);

    const totalCategories = categories?.length;

    const { control } = useForm<CreateCategoriesRequestType>({
        defaultValues: {
            outletId: outletId,
            name: '',
            sequence: 0,
        }
    });

    const handleAddCategory = () => {
        setAddingCategory(true);
    }

    const handleAddSubCategory = () => {
        setAddingSubCategory(true);
    }

    const handleSelectItem = (subCategoryId: string) => {
        setSelectedSubCategoryId(subCategoryId);
    }

    return (
        <Card classes='w-full flex-2 p-0'>

            <div className='h-full flex flex-col'>
                <div className='flex justify-between items-center bg-green-light px-7 py-2 rounded-t-2xl'>
                    <div className='text-xl font-bold'>Categories({totalCategories})</div>
                    <Button
                        icon={<FaPlus />}
                        color='transparent'
                        onClick={handleAddCategory}
                    >
                        Add Category
                    </Button>
                </div>

                <Accordion.Root type="single" collapsible className="w-full h-full px-5 py-2 overflow-auto ">
                    {addingCategory &&
                        <div className="flex gap-5 my-5 items-center animate-in fade-in slide-in-from-top-2">
                            <Input color="white" placeholder="Enter category name"
                                inputClasses="h-14" id="categoryInput" />
                            <FaCheck className="w-10 h-10 cursor-pointer text-green-500" />
                            <FaXmark className="w-10 h-10 cursor-pointer text-red-500" onClick={() => setAddingCategory(false)} />
                        </div>
                    }

                    {isCategoriesLoading ?
                        <Skeleton height="h-15" rows={5} className="py-6 px-3" /> :
                        categories?.map(item => (
                            <Accordion.Item value={item._id} key={item._id} className="space-y-2">
                                <Accordion.Header className="group flex relative items-center">
                                    <Accordion.Trigger className=" border-b-4 border-gray-300 flex w-full items-center justify-between px-6 py-4 rounded-2xl hover:bg-gray-100"
                                        onClick={() => {
                                            setCategoryId(item._id);
                                        }}
                                    >
                                        <span>{item.name}</span>
                                        <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                    <div className="flex items-center absolute end-15">
                                        <Button
                                            color="transparent"
                                            classes=' text-green-500 group-data-[state=closed]:hidden'
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="transparent"
                                            classes=' text-red-500 group-data-[state=closed]:hidden'
                                        >
                                            Delete
                                        </Button>
                                        <FormSwitch
                                            control={control}
                                            name="isAvailable"
                                            className=''
                                        />
                                    </div>

                                </Accordion.Header>

                                <Accordion.Content className="overflow-hidden  transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                                    <ul className="p-0 space-y-1">
                                        {
                                            subCategories ? subCategories.map(item => (
                                                <li key={item._id}
                                                    className={twMerge("flex justify-between items-center pl-10 pr-13 rounded-2xl hover:bg-gray-100 cursor-pointer",
                                                        selectedSubCategoryId === item._id ? 'bg-gray-200 border-b-4 border-gray-500 hover:bg-gray-200' : '')
                                                    }
                                                    onClick={() => handleSelectItem(item._id)}
                                                >   
                                                <span className="my-4">{item.name}</span>
                                                    
                                                    <div className={twMerge("flex items-center",
                                                        selectedSubCategoryId !== item._id ? 'hidden' : '')}>
                                                        <Button
                                                            color="transparent"
                                                            classes=' text-green-500'
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            color="transparent"
                                                            classes=' text-red-500'
                                                        >
                                                            Delete
                                                        </Button>
                                                        <FormSwitch
                                                            control={control}
                                                            name="isAvailable"
                                                            className=''
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
                                                        inputClasses="h-14"
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
                                </Accordion.Content>
                            </Accordion.Item>
                        ))

                    }
                </Accordion.Root>
            </div>
        </Card>
    )
}

export default Categories