import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import FormSwitch from "@/components/common/FormSwitch";
import * as Accordion from '@radix-ui/react-accordion'
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import type { MenuFormValues } from "@/models/menu.model";
import { useState } from "react";
import Input from "@/components/common/Input";
import { useListCategories, useListSubCategories } from "../-query-hooks";
import Skeleton from "@/components/loaders/Skeleton";


const Categories = () => {

    const [addingCategory, setAddingCategory] = useState(false);
    const [addingSubCategory, setAddingSubCategory] = useState(false);
    const [categoryId, setCategoryId] = useState('');

    const { control } = useForm<MenuFormValues>({
        defaultValues: {
            itemName: '',
            isAvailable: true,
            isVeg: true,
        }
    });

    const handleAddCategory = () => {
        setAddingCategory(true);
    }

    const handleAddSubCategory = () => {
        setAddingSubCategory(true);
    }

    const { data: categories, isLoading: isCategoriesLoading } = useListCategories('696656b3646f68216ea092c8');
    const { data: subCategories, refetch } = useListSubCategories(categoryId);

    const totalCategories = categories?.length;

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
                                inputClasses="h-14" />
                            <FaCheck className="w-10 h-10 cursor-pointer text-green-500" />
                            <FaXmark className="w-10 h-10 cursor-pointer text-red-500" onClick={() => setAddingCategory(false)} />
                        </div>
                    }

                    {isCategoriesLoading ?
                        <Skeleton height="h-15" rows={5} className="py-6 px-3" /> :
                        categories?.map(item => (
                            <Accordion.Item value={item._id} className="space-y-2">
                                <Accordion.Header className="flex relative items-center ">
                                    <Accordion.Trigger className="group border-b-4 border-gray-300 flex w-full items-center justify-between px-6 py-4 rounded-2xl hover:bg-gray-100"
                                        onClick={() => {
                                            setCategoryId(item._id);
                                            refetch();
                                        }}
                                    >
                                        <span>{item.name}</span>
                                        <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                    <FormSwitch
                                        control={control}
                                        name="isAvailable"
                                        className='absolute end-15'
                                    />
                                </Accordion.Header>

                                <Accordion.Content className="overflow-hidden  transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                                    <ul className="p-0 space-y-1">
                                        {
                                            subCategories ? subCategories.map(item => (
                                                <li className="flex justify-between p-4 pl-10 pr-13 rounded-2xl hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => console.log('select item')}
                                                >
                                                    {item.name}
                                                    <FormSwitch
                                                        control={control}
                                                        name="isAvailable"
                                                    />
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