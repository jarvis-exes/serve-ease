import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import * as Accordion from "@radix-ui/react-accordion";
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa";
import Input from "@/components/common/Input";
import { useEffect, useState, type FC } from "react";
import { FaXmark } from "react-icons/fa6";
import {
  useCreateItem,
  useDeleteItem,
  useListItems,
  useUpdateItem,
} from "../-query-hooks";
import Skeleton from "@/components/loaders/Skeleton";
import SwitchButton from "@/components/common/Switch";
import { Quantity } from "@/models/menu.enum";
import type { ItemType } from "@/models/menu.model";

type ItemsProps = {
  subCategoryId: string;
};
const Items: FC<ItemsProps> = ({ subCategoryId }) => {
  const [addingItem, setAddingItem] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<ItemType | null>(null);

  const { data: items, isLoading } = useListItems(subCategoryId);
  const { mutateAsync: createItem } = useCreateItem();
  const { mutateAsync: deleteItem } = useDeleteItem();
  const { mutateAsync: updateItem } = useUpdateItem();

  const totalItems = items?.length;

  const handleAddItem = () => {
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

    const payload = {
      itemId: editingItem?._id,
      name: editingItem?.name,
      isActive: editingItem?.isActive,
      sequence: editingItem?.sequence,
      prices: {
        FULL: editingItem.prices?.FULL,
        HALF: editingItem.prices?.HALF,
        QUARTER: editingItem.prices?.QUARTER,
      },
    };
    updateItem({ payload, subCategoryId });
    setEditingId(null);
    setName("");
  };

  const handleDeleteItem = (itemId: string) => {
    deleteItem({ itemId, subCategoryId });
  };

  useEffect(() => {
    if (!editingItem) return;

    // const timeout = setTimeout(() => {
      handleUpdateItem();
    // }, 500);

    // return () => clearTimeout(timeout);
  }, [editingItem]);

  return (
    <Card classes="flex-6 p-0">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center bg-green-light px-7 py-2 rounded-t-2xl">
          <div className="text-xl font-bold">Items({totalItems})</div>
          <Button
            classes=""
            icon={<FaPlus />}
            color="transparent"
            onClick={() => {
              setAddingItem(true);
            }}
          >
            Add Item
          </Button>
        </div>
        <Accordion.Root
          type="single"
          collapsible
          className="w-full h-full px-5 py-2 overflow-auto "
        >
          {addingItem && (
            <div className="flex gap-5 my-5 items-center animate-in fade-in slide-in-from-top-2">
              <Input
                color="white"
                placeholder="Enter item name"
                inputClasses="h-14"
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
            <Skeleton height="h-10" rows={6} />
          ) : items && items.length > 0 ? (
            items?.map((item) => (
              <Accordion.Item value={item._id} className="space-y-2">
                <Accordion.Header className="group flex relative items-center ">
                  <Accordion.Trigger
                    disabled={!item.isActive}
                    onClick={() => setEditingItem(item)}
                    className="border-b-4 border-gray-300 flex w-full items-center justify-between py-4 px-8 rounded-2xl hover:bg-gray-100"
                  >
                    {editingId && editingId === item._id ? (
                      <div
                        className="flex w-full gap-5 mr-5 items-center animate-in fade-in slide-in-from-top-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Input
                          color="white"
                          placeholder="Enter category name"
                          inputClasses="h-12"
                          id="categoryInput"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                        <div className="flex gap-2 items-center">
                          <FaCheck
                            className="w-10 h-10 cursor-pointer text-green-500"
                            onClick={() => handleUpdateItem()}
                          />
                          <FaXmark
                            className="w-12 h-12 cursor-pointer text-red-500"
                            onClick={() => setEditingId(null)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex justify-between items-center mr-5">
                        <span>{item.name}</span>
                      </div>
                    )}
                    <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <div className="flex items-center absolute end-15">
                    {!editingId && (
                      <div
                        className="flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          color="transparent"
                          classes=" text-green-500 group-data-[state=closed]:hidden"
                          onClick={() => {
                            setEditingId(item._id);
                            setName(item.name);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="transparent"
                          classes=" text-red-500 group-data-[state=closed]:hidden"
                          onClick={() => handleDeleteItem(item._id)}
                        >
                          Delete
                        </Button>
                        <SwitchButton
                          name="isActive"
                          className=""
                          checked={item.isActive}
                          onChange={() => {
                            setEditingItem({
                              ...item,
                              isActive: !item.isActive,
                            });
                            handleUpdateItem();
                          }}
                        />
                      </div>
                    )}
                  </div>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden w-full transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down flex gap-3 mb-2">
                  <ul className="p-0 w-1/2 min-w-fit space-y-1">
                    <li className="flex justify-between items-center py-2 px-2 lg:px-12 rounded-2xl hover:bg-gray-100 cursor-pointer">
                      <span>{Quantity.FULL}</span>
                      <Input
                        color="white"
                        placeholder="Price"
                        containerClasses="w-32"
                        value={editingItem?.prices.FULL}
                        onChange={(e) => {
                          setEditingItem((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  prices: {
                                    ...prev.prices,
                                    FULL: Number(e.target.value),
                                  },
                                }
                              : prev,
                          );
                        }}
                      />
                    </li>
                    <li className="flex justify-between items-center py-2 px-2 lg:px-12 rounded-2xl hover:bg-gray-100 cursor-pointer">
                      <span>{Quantity.HALF}</span>
                      <Input
                        color="white"
                        placeholder="Price"
                        containerClasses="w-32"
                        value={editingItem?.prices.HALF}
                        onChange={(e) =>
                          setEditingItem((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  prices: {
                                    ...prev.prices,
                                    HALF: Number(e.target.value),
                                  },
                                }
                              : prev,
                          )
                        }
                      />
                    </li>
                    <li className="flex justify-between items-center py-2 px-2 lg:px-12 rounded-2xl hover:bg-gray-100 cursor-pointer">
                      <span>{Quantity.QUARTER}</span>
                      <Input
                        color="white"
                        placeholder="Price"
                        containerClasses="w-32"
                        value={editingItem?.prices.QUARTER}
                        onChange={(e) =>
                          setEditingItem((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  prices: {
                                    ...prev.prices,
                                    QUARTER: Number(e.target.value),
                                  },
                                }
                              : prev,
                          )
                        }
                      />
                    </li>
                  </ul>
                  <div className="w-1/2 bg-gray-200 rounded-2xl p-2">
                    <img
                      className="w-full h-full"
                      src={item.image}
                      alt="Item Image"
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))
          ) : (
            <div className="h-full w-full flex justify-center items-center text-2xl font-bold text-gray-600">
              <span>No Items Added</span>
            </div>
          )}
        </Accordion.Root>
      </div>
    </Card>
  );
};

export default Items;
