import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import FormSwitch from "@/components/common/FormSwitch";
import * as Accordion from '@radix-ui/react-accordion'
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa";
import { items } from "../-constants";
import { useForm } from "react-hook-form";
import type { MenuFormValues } from "@/models/menu.model";
import Input from "@/components/common/Input";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const Items = () => {
    const [addingItem, setAddingItem] = useState(false);

    const { control } = useForm<MenuFormValues>({
        defaultValues: {
            itemName: '',
            isAvailable: true,
            isVeg: true,
        }
    });

    const handleAddItem = () => {
        setAddingItem(true);
    }

    return (
        <Card classes='w-full p-0 flex-3'>
            <div className='h-full flex flex-col'>
                <div className='flex justify-between items-center bg-green-light px-7 py-2 rounded-t-2xl'>
                    <div className='text-xl font-bold'>Items(12)</div>
                    <Button classes='' icon={<FaPlus />} color='transparent' onClick={() => { handleAddItem() }}>
                        Add Item
                    </Button>
                </div>
                <Accordion.Root type="single" collapsible className="w-full h-full px-5 py-2 overflow-auto ">
                    {addingItem &&
                        <div className="flex gap-5 my-5 items-center">
                            <Input
                                color="white"
                                placeholder="Enter item name"
                                inputClasses="h-14" />
                            <FaCheck className="w-10 h-10 cursor-pointer text-green-500" />
                            <FaXmark className="w-10 h-10 cursor-pointer text-red-500" onClick={() => setAddingItem(false)} />
                        </div>
                    }

                    {items.map((item, idx) => (
                        <Accordion.Item value={`item-${idx}`} className="space-y-2">
                            <Accordion.Header>
                                <Accordion.Trigger className="group border-b-4 border-gray-300 flex w-full items-center justify-between p-4 rounded-2xl hover:bg-gray-100">
                                    <div className='w-full flex justify-between items-center mr-5'>
                                        <span>{item.categorie}</span>
                                        <div onClick={(e) => {
                                            e.stopPropagation();
                                        }}>
                                            {/* <FormSwitch
                                                control={control}
                                                name="isAvailable"
                                            /> */}
                                        </div>

                                    </div>
                                    <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                                </Accordion.Trigger>
                            </Accordion.Header>

                            <Accordion.Content className="overflow-hidden  transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                                <ul className="p-0 space-y-1">
                                    {
                                        item.subCategories.map(item => (
                                            <li className="flex justify-between items-center p-4 pl-10 pr-13 rounded-2xl hover:bg-gray-100 cursor-pointer">
                                                <div className='flex pr-10 w-full items-center justify-between'>
                                                    <span>
                                                        {item}
                                                    </span>
                                                    <Input
                                                        color='white'
                                                        placeholder='Price'
                                                        containerClasses='w-32'
                                                        label='Rs.'
                                                    />
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </div>
        </Card>
    )
}

export default Items