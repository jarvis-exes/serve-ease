import { createFileRoute } from '@tanstack/react-router'
import Categories from './-components/Categories';
import Items from './-components/Items';
import { useState } from 'react';
import { useIsMobile } from '@/utils/mobile';


export const Route = createFileRoute('/_protected/menu/')({
    component: Menu,
})

function Menu() {
    const isMobile = useIsMobile();
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');

    if (isMobile) return (
        <div className='flex flex-col h-full'>
            <div className='flex h-full gap-2 md:gap-3 overflow-auto p-2 md:p-3'>
                {selectedSubCategoryId ?
                    <Items subCategoryId={selectedSubCategoryId} /> :
                    <Categories setSelectedSubCategoryId={setSelectedSubCategoryId} selectedSubCategoryId={selectedSubCategoryId} />
                }
            </div>
        </div>
    )

    return (
        <div className='flex flex-col h-full'>
            <div className='flex h-full gap-2 md:gap-3 overflow-auto p-2 md:p-3'>
                <Categories setSelectedSubCategoryId={setSelectedSubCategoryId} selectedSubCategoryId={selectedSubCategoryId} />
                <Items subCategoryId={selectedSubCategoryId} />
            </div>
        </div>
    )
}

