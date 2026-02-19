import { createFileRoute } from '@tanstack/react-router'
import Input from '@/components/common/Input';
import Categories from './-components/Categories';
import Items from './-components/Items';
import { useState } from 'react';


export const Route = createFileRoute('/_protected/menu/')({
    component: Menu,
})

function Menu() {
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');

    return (
        <div className='flex flex-col h-full'>
            <div className='flex pt-5 px-5'>
                <Input color='white' containerClasses='w-1/3' placeholder='Search for an item or category' />
            </div>

            <div className='flex h-full gap-5 overflow-auto p-5'>
                <Categories setSelectedSubCategoryId= {setSelectedSubCategoryId} selectedSubCategoryId={selectedSubCategoryId}/>
                <Items subCategoryId={selectedSubCategoryId}/>
            </div>
        </div>
    )
}

