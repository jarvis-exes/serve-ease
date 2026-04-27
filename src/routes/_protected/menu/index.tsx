import { createFileRoute } from '@tanstack/react-router'
import Categories from './-components/Categories';
import Items from './-components/Items';
import { useState } from 'react';
import { useIsMobile } from '@/utils/mobile';
import type { SubCategoryType } from '@/models';


export const Route = createFileRoute('/_protected/menu/')({
    component: Menu,
})

function Menu() {
    const isMobile = useIsMobile();
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType>();

    if (isMobile) return (
        <div className='flex flex-col h-full'>
            <div className='flex h-full gap-2 md:gap-3 overflow-auto p-2 md:p-3'>
                {selectedSubCategory ?
                    <Items setSelectedSubCategory={setSelectedSubCategory} selectedSubCategory={selectedSubCategory} /> :
                    <Categories setSelectedSubCategory={setSelectedSubCategory} selectedSubCategory={selectedSubCategory} />
                }
            </div>
        </div>
    )

    return (
        <div className='flex flex-col h-full'>
            <div className='flex h-full gap-2 md:gap-3 overflow-auto p-2 md:p-3'>
                <Categories setSelectedSubCategory={setSelectedSubCategory} selectedSubCategory={selectedSubCategory} />
                <Items setSelectedSubCategory={setSelectedSubCategory} selectedSubCategory={selectedSubCategory} />
            </div>
        </div>
    )
}

