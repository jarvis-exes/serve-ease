import Card from '@/components/common/Card'
import { createFileRoute } from '@tanstack/react-router'
import * as Accordion from '@radix-ui/react-accordion'
import { FaChevronDown } from "react-icons/fa";
import FormSwitch from '@/components/common/FormSwitch';
import { useForm } from 'react-hook-form';


export const Route = createFileRoute('/_protected/menu/edit')({
    component: EditMenu,
})

const menu = [
    {
        categorie: 'Fast Food',
        subCategories: ['Samosa', 'Kachori', 'Gol gappee']
    },
    {
        categorie: 'Main Course',
        subCategories: ['Paneer', 'Chole', 'Allo Matar']
    },
    {
        categorie: 'Fast Food',
        subCategories: ['Samosa', 'Kachori', 'Gol gappee']
    },
    {
        categorie: 'Main Course',
        subCategories: ['Paneer', 'Chole', 'Allo Matar']
    },
    {
        categorie: 'Fast Food',
        subCategories: ['Samosa', 'Kachori', 'Gol gappee']
    },
    {
        categorie: 'Main Course',
        subCategories: ['Paneer', 'Chole', 'Allo Matar']
    },
    {
        categorie: 'Main Course',
        subCategories: ['Paneer', 'Chole', 'Allo Matar']
    },
    {
        categorie: 'Fast Food',
        subCategories: ['Samosa', 'Kachori', 'Gol gappee']
    },
    {
        categorie: 'Main Course',
        subCategories: ['Paneer', 'Chole', 'Allo Matar']
    },
    {
        categorie: 'Fast Food',
        subCategories: ['Samosa', 'Kachori', 'Gol gappee']
    },
    {
        categorie: 'Fast Food',
        subCategories: ['Samosa', 'Kachori', 'Gol gappee']
    },
    {
        categorie: 'Main Course',
        subCategories: ['Paneer', 'Chole', 'Allo Matar']
    },
    {
        categorie: 'Fast Food',
        subCategories: ['Samosa', 'Kachori', 'Gol gappee']
    },
    {
        categorie: 'Main Course Last',
        subCategories: ['Paneer', 'Chole', 'Allo Matar']
    }
]

interface MenuFormValues {
    itemName: string;
    isAvailable: boolean;
    isVeg: boolean;
}

function EditMenu() {
    const { control } = useForm<MenuFormValues>({
        defaultValues: {
            itemName: '',
            isAvailable: true,
            isVeg: true,
        }
    });



    return <div className='flex h-full gap-5 p-5'>
        <Card classes='w-full h-full flex-2 p-0'>
            <div className='h-full flex flex-col'>
                <div className='text-xl font-bold bg-green-light p-3 rounded-t-2xl'>
                    <div>Categories(12)</div>
                    <div></div>
                </div>
                <Accordion.Root type="single" collapsible className="w-full h-full p-5 overflow-auto ">
                    {menu.map((item, idx) => (
                        <Accordion.Item value={`item-${idx}`} className="space-y-2">
                            <Accordion.Header>
                                <Accordion.Trigger className="group border-b-4 border-gray-300 flex w-full items-center justify-between p-4 rounded-2xl hover:bg-slate-100">
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
                                            <li className="flex justify-between p-4 pl-10 pr-13 rounded-2xl hover:bg-slate-100 cursor-pointer">
                                                {item}
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

        <Card classes='w-full p-5 flex-3'>
            <div>Items</div>
        </Card>
    </div>
}

