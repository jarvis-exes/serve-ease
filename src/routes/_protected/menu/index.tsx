import Card from '@/components/common/Card'
import { createFileRoute } from '@tanstack/react-router'
import * as Accordion from '@radix-ui/react-accordion'
import { FaChevronDown, FaPlus } from "react-icons/fa";
import FormSwitch from '@/components/common/FormSwitch';
import { useForm } from 'react-hook-form';
import { items, menu } from './-constants';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';


export const Route = createFileRoute('/_protected/menu/')({
    component: Menu,
})

interface MenuFormValues {
    itemName: string;
    isAvailable: boolean;
    isVeg: boolean;
}

function Menu() {
    const { control } = useForm<MenuFormValues>({
        defaultValues: {
            itemName: '',
            isAvailable: true,
            isVeg: true,
        }
    });

    return (
        <div className='flex flex-col h-full'>
            <div className='flex pt-5 px-5'>
                <Input color='white' containerClasses='w-1/3' placeholder='Search for an item or category' />
            </div>

            <div className='flex flex-1 h-full gap-5 overflow-auto p-5'>
                <Card classes='w-full flex-2 p-0'>
                    <div className='h-full flex flex-col'>
                        <div className='flex justify-between items-center bg-green-light px-7 py-2 rounded-t-2xl'>
                            <div className='text-xl font-bold'>Categories(12)</div>
                            <Button classes='' icon={<FaPlus />} color='transparent'>
                                Add Category
                            </Button>
                        </div>
                        <Accordion.Root type="single" collapsible className="w-full h-full px-5 py-2 overflow-auto ">
                            {menu.map((item, idx) => (
                                <Accordion.Item value={`item-${idx}`} className="space-y-2">
                                    <Accordion.Header>
                                        <Accordion.Trigger className="group border-b-4 border-gray-300 flex w-full items-center justify-between p-4 rounded-2xl hover:bg-gray-100">
                                            <div className='w-full flex justify-between items-center mr-5'>
                                                <span>{item.categorie}</span>
                                                <div onClick={(e) => {
                                                    e.stopPropagation();
                                                }}>
                                                    <FormSwitch
                                                        control={control}
                                                        name="isAvailable"
                                                    />
                                                </div>

                                            </div>
                                            <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                                        </Accordion.Trigger>
                                    </Accordion.Header>

                                    <Accordion.Content className="overflow-hidden  transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                                        <ul className="p-0 space-y-1">
                                            {
                                                item.subCategories.map(item => (
                                                    <li className="flex justify-between p-4 pl-10 pr-13 rounded-2xl hover:bg-gray-100 cursor-pointer">
                                                        {item}
                                                        <FormSwitch
                                                            control={control}
                                                            name="isAvailable"
                                                        />
                                                    </li>
                                                ))
                                            }
                                            <li className='flex justify-center'>
                                                <Button classes='text-green-dark text-md' icon={<FaPlus />} color='transparent'>
                                                    Add Sub Category
                                                </Button>
                                            </li>
                                        </ul>
                                    </Accordion.Content>
                                </Accordion.Item>
                            ))}
                        </Accordion.Root>
                    </div>
                </Card>

                <Card classes='w-full p-0 flex-3'>
                    <div className='h-full flex flex-col'>
                        <div className='flex justify-between items-center bg-green-light px-7 py-2 rounded-t-2xl'>
                            <div className='text-xl font-bold'>Items(12)</div>
                            <Button classes='' icon={<FaPlus />} color='transparent'>
                                Add Item
                            </Button>
                        </div>
                        <Accordion.Root type="single" collapsible className="w-full h-full px-5 py-2 overflow-auto ">
                            {items.map((item, idx) => (
                                <Accordion.Item value={`item-${idx}`} className="space-y-2">
                                    <Accordion.Header>
                                        <Accordion.Trigger className="group border-b-4 border-gray-300 flex w-full items-center justify-between p-4 rounded-2xl hover:bg-gray-100">
                                            <div className='w-full flex justify-between items-center mr-5'>
                                                <span>{item.categorie}</span>
                                                <div onClick={(e) => {
                                                    e.stopPropagation();
                                                }}>
                                                    <FormSwitch
                                                        control={control}
                                                        name="isAvailable"
                                                    />
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
                                                        <FormSwitch
                                                            control={control}
                                                            name="isAvailable"
                                                        />
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
            </div>
        </div>
    )
}

