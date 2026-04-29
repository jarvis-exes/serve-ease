import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import * as Accordion from "@radix-ui/react-accordion";
import { FaCheck, FaChevronDown, FaEdit, FaPlus } from "react-icons/fa";
import Input from "@/components/common/Input";
import { useRef, useState, type Dispatch, type FC, type SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";
import {
  useCreateItem,
  useDeleteItem,
  useListItems,
  useUpdateItem,
} from "../-query-hooks";
import SwitchButton from "@/components/common/Switch";
import { Quantity } from "@/enums/menu.enum";
import type { ItemType, SubCategoryType } from "@/models/menu.model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdArrowBackIosNew, MdDelete } from "react-icons/md";

type ItemsProps = {
  setSelectedSubCategory: Dispatch<SetStateAction<SubCategoryType | undefined>>;
  selectedSubCategory?: SubCategoryType;
};

const Items: FC<ItemsProps> = ({ setSelectedSubCategory, selectedSubCategory }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [addingItem, setAddingItem] = useState(false);
  const [name, setName] = useState("");
  const [editingItem, setEditingItem] = useState<ItemType | null>(null);
  const [images, setImages] = useState<Record<string, string | null>>({});

  const subCategoryId = selectedSubCategory?._id || '';

  const { data: items, isLoading } = useListItems(subCategoryId);
  const { mutateAsync: createItem } = useCreateItem();
  const { mutateAsync: deleteItem } = useDeleteItem();
  const { mutateAsync: updateItem } = useUpdateItem();

  const totalItems = items?.length;

  const handleAddItem = () => {
    if (selectedSubCategory)
      createItem({
        subCategoryId,
        name,
        sequence: totalItems || 0 + 1,
        isActive: true,
        prices: { FULL: 0 },
      });
    setAddingItem(false);
    setName("");
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    const payload = editingItem;
    updateItem({ payload, subCategoryId });
  };

  const handleDeleteItem = (itemId: string) => {
    deleteItem({ itemId, subCategoryId });
  };

  const updatePrice = (type: keyof typeof Quantity, value: string) => {
    setEditingItem((prev) =>
      prev
        ? {
          ...prev,
          prices: {
            ...prev.prices,
            [type]: value,
          },
        }
        : prev
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, item: ItemType) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;
    const previewUrl = URL.createObjectURL(file)
    setImages(prev => ({ ...prev, [item._id]: previewUrl }))
    setEditingItem(prev =>
      prev ? { ...prev, image: file as any } : prev
    );
  };

  const toggleItem = async (item: ItemType) => {
    const payload = {
      _id: item._id,
      isActive: !item.isActive
    }
    updateItem({ payload, subCategoryId })
  }

  const handleRemoveImage = (item: ItemType) => {
    const payload = {
      _id: item._id,
      removeImage: true
    }
    setImages(prev => ({ ...prev, [item._id]: null }))
    updateItem({ payload, subCategoryId })
  }

  return (
    <Card shadow="none" className="flex-6 h-full flex flex-col gap-2  md:gap-4 bg-slate-200  p-2 md:p-4">
      {subCategoryId && <div className="flex justify-between items-center gap-2 rounded-t-2xl">
        <Button
          icon={<MdArrowBackIosNew />}
          onClick={() => {
            setSelectedSubCategory(undefined);
          }}
          className="md:hidden"
        >
          Back
        </Button>
        <div className="text-xl font-bold">{selectedSubCategory?.name}({totalItems})</div>

        <Button
          icon={<FaPlus />}
          color="dark"
          onClick={() => {
            setAddingItem(true);
          }}
        >
          Add
        </Button>
      </div>}
      <Accordion.Root
        type="single"
        collapsible
        className="w-full h-full overflow-auto flex flex-col gap-2"
      >
        {addingItem && (
          <div className="flex gap-2 items-center animate-in fade-in slide-in-from-top-2">
            <Input
              color="white"
              placeholder="Enter item name"
              inputClasses="h-12"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <FaCheck
              className="w-10 h-10 cursor-pointer text-green-500"
              onClick={() => handleAddItem()}
            />
            <FaXmark
              className="w-10 h-10 cursor-pointer text-red-500"
              onClick={() => setAddingItem(false)}
            />
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3 px-1 py-4">
            <Skeleton height={40} borderRadius={20} />
            <Skeleton height={40} borderRadius={20} />
            <Skeleton height={40} borderRadius={20} width={'70%'} />
          </div>
        ) : items && items.length > 0 ? (
          items?.map((item) => {
            const imageSrc = images[item._id] === null ? null : images[item._id] ?? item.image;

            return (
              <Accordion.Item
                key={item._id}
                value={item._id}
                className="bg-white rounded-2xl"
              >
                <Accordion.Header className="group flex relative items-center ">
                  <Accordion.Trigger
                    disabled={!item.isActive}
                    className="flex w-full items-center justify-between p-2 pr-4 rounded-2xl 
                              hover:shadow-[0_4px_0_0_#d1d5db] group-data-[state=open]:shadow-[0_4px_0_0_#d1d5db] transition-all"
                  >
                    {editingItem && editingItem._id === item._id ?
                      <Input
                        color="white"
                        placeholder="Enter category name"
                        containerClasses=" mr-20 items-center animate-in fade-in slide-in-from-top-2"
                        id="categoryInput"
                        value={editingItem?.name || ""}
                        onClick={e => e.stopPropagation()}
                        onChange={(e) =>
                          setEditingItem((prev) =>
                            prev
                              ? {
                                ...prev,
                                name: e.target.value,
                              }
                              : null
                          )
                        }
                      />
                      : (
                        <span className="m-2 md:ml-4">{item.name}</span>
                      )}
                    <FaChevronDown className="transition-transform duration-300 shrink-0 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>

                  <SwitchButton
                    name="isActive"
                    className="absolute end-12 md:end-15"
                    checked={item.isActive}
                    onChange={() => {
                      toggleItem(item);
                    }}
                  />

                </Accordion.Header>

                <Accordion.Content className="group overflow-hidden w-full transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                  <div className="flex flex-col gap-2 p-2">
                    <div
                    className="flex gap-2 w-full justify-center pt-1 items-center"
                  >
                    <div className="text-green-500 w-full h-10 bg-green-100 rounded-full p-2 flex items-center cursor-pointer">
                      {editingItem?._id === item._id ?
                        <div
                          className="cursor-pointer w-full flex items-center justify-center gap-2 font-bold text-lg"
                          onClick={() => {
                            handleUpdateItem();
                            setEditingItem(null);
                          }}
                        >
                          <FaCheck
                            className="w-5 h-5"
                          />
                          <span>Update</span>
                        </div>
                        : <FaEdit
                          className="h-6 w-full"
                          onClick={() => {
                            setEditingItem(item);
                          }}
                        />
                      }
                    </div>
                    <div className=" text-red-500 bg-red-100 rounded-full w-full h-10 p-2 flex items-center cursor-pointer">
                      {editingItem?._id === item._id ?
                        <div
                          className="cursor-pointer w-full flex items-center justify-center gap-2 font-bold text-lg"
                          onClick={() => setEditingItem(null)}>
                          <FaXmark
                            className="w-6 h-6"
                          />
                          <span>Cancel</span>
                        </div>
                        : <MdDelete
                          className="h-8 w-full"
                          onClick={() => handleDeleteItem(item._id)}
                        />
                      }
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <ul className="w-1/2 min-w-fit space-y-1 items-center">
                    {Object.keys(Quantity).map((key) => {
                      const qKey = key as keyof typeof Quantity;
                      return (
                        <li
                          key={qKey}
                          className="flex justify-between gap-2 items-center py-2 md:p-2 rounded-2xl hover:bg-gray-100 cursor-pointer"
                        >
                          <span>{Quantity[qKey]}</span>
                          <Input
                            color="white"
                            placeholder="Price"
                            containerClasses="w-24 md:w-32"
                            disabled={editingItem?._id !== item._id}
                            value={editingItem?._id === item._id ? editingItem?.prices[qKey] : item.prices[qKey]}
                            onChange={(e) => updatePrice(qKey, e.target.value)}
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <div className="w-1/2 h-44 relative flex gap-2 justify-center items-center font-bold bg-gray-200 rounded-2xl">
                    {
                      imageSrc ? <img
                        className="rounded-2xl h-full"
                        src={
                          imageSrc as string
                        }
                        alt="Item Image"
                      /> :
                        <div>Image Removed</div>
                    }
                    {editingItem?._id == item._id &&
                      <div className="absolute h-full w-full flex flex-col gap-5 items-center justify-center rounded-2xl backdrop-blur-sm">
                        <Button onClick={() => fileInputRef.current?.click()}>
                          Upload
                        </Button>
                        <Button onClick={() => handleRemoveImage(item)}>
                          Remove
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          hidden
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, item)}
                        />
                      </div>
                    }
                  </div>
                  </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            )
          })
        ) : (
          <div className="h-full w-full flex justify-center items-center text-2xl font-bold text-gray-600">
            {
              subCategoryId ? <span>No Items Added</span> :
                <span>Select a sub category</span>
            }

          </div>
        )}
      </Accordion.Root>
    </Card>
  );
};

export default Items;
