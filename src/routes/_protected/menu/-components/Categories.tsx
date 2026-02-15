import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import * as Accordion from '@radix-ui/react-accordion'
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState, type FC } from "react";
import Input from "@/components/common/Input";
import { useListCategories } from "../-query-hooks";
import Skeleton from "@/components/loaders/Skeleton";
import SubCategories from "./SubCategories";
import SwitchButton from "@/components/common/Switch";

type CategoriesProps = {
    setSelectedSubCategoryId: (id: string) => void;
    selectedSubCategoryId: string;
}

const Categories: FC<CategoriesProps> = ({ setSelectedSubCategoryId, selectedSubCategoryId }) => {

    const [addingCategory, setAddingCategory] = useState(false);

    const [categoryId, setCategoryId] = useState('');

    const outletId = '696656b3646f68216ea092c8';

    const { data: categories, isLoading: isCategoriesLoading } = useListCategories(outletId);


    const totalCategories = categories?.length;

    const handleAddCategory = () => {
        setAddingCategory(true);
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
                                        <SwitchButton
                                            name="isActive"
                                            className=''
                                            checked={item.isActive}
                                            onChange={() => item.isActive = false}
                                        />
                                    </div>

                                </Accordion.Header>

                                <Accordion.Content className="overflow-hidden  transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                                    <SubCategories
                                        categoryId={categoryId}
                                        selectedSubCategoryId={selectedSubCategoryId}
                                        setSelectedSubCategoryId={setSelectedSubCategoryId}
                                    />
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