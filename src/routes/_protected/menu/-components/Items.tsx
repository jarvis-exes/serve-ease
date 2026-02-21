import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import * as Accordion from "@radix-ui/react-accordion";
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa";
import Input from "@/components/common/Input";
import { useRef, useState, type FC } from "react";
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [addingItem, setAddingItem] = useState(false);
  const [name, setName] = useState("");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    setEditingItem(prev =>
      prev ? { ...prev, image: file as any } : prev
    );
  };


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
                    className="border-b-4 border-gray-300 flex w-full items-center justify-between px-8 rounded-2xl hover:bg-gray-100"
                  >
                    {editingItem && editingItem._id === item._id ? (
                      <div
                        className="animate-in fade-in slide-in-from-top-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Input
                          color="transparent"
                          placeholder="Enter category name"
                          inputClasses="h-14 p-0"
                          id="categoryInput"
                          value={editingItem?.name || ""}
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
                      </div>
                    ) : (
                      <div className="w-full flex justify-between items-center py-4 mr-5">
                        {item.name}
                      </div>
                    )}
                    <FaChevronDown className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <div className="flex items-center absolute end-15">
                    <div
                      className="flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {editingItem && editingItem._id === item._id ?
                        <div>
                          <Button
                            color="transparent"
                            classes=" text-green-500 group-data-[state=closed]:hidden"
                            onClick={() => {
                              setEditingItem(null);
                              handleUpdateItem();
                            }}
                          >
                            Update
                          </Button>
                          <Button
                            color="transparent"
                            classes=" text-red-500 group-data-[state=closed]:hidden"
                            onClick={() => setEditingItem(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                        :
                        <div>
                          <Button
                            color="transparent"
                            classes=" text-green-500 group-data-[state=closed]:hidden"
                            onClick={() => {
                              setEditingItem(item);
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
                        </div>
                      }
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

                  </div>
                </Accordion.Header>

                <Accordion.Content className="flex gap-3 mb-2 h-44 w-full transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                  <ul className="p-0 w-1/2 min-w-fit space-y-1 items-center">
                    {Object.keys(Quantity).map((key) => {
                      const qKey = key as keyof typeof Quantity;
                      return (
                        <li
                          key={qKey}
                          className="flex justify-between gap-5 items-center py-2 px-2 lg:px-10 rounded-2xl hover:bg-gray-100 cursor-pointer"
                        >
                          <span>{Quantity[qKey]}</span>
                          <Input
                            color="white"
                            placeholder="Price"
                            containerClasses="w-32"
                            disabled={editingItem?._id !== item._id}
                            value={editingItem?._id === item._id ? editingItem?.prices[qKey] : item.prices[qKey]}
                            onChange={(e) => updatePrice(qKey, e.target.value)}
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <div className="w-1/2 relative h-full flex gap-2 justify-center bg-gray-200 rounded-2xl">
                    <img
                      className="h-full rounded-2xl"
                      src={
                        editingItem?._id === item._id &&
                          editingItem.image instanceof File
                          ? URL.createObjectURL(editingItem.image)
                          : (item.image as string)
                      }
                      alt="Item Image"
                    />
                    {editingItem?._id == item._id &&
                      <div className="absolute h-full w-full flex flex-col gap-5 items-center justify-center rounded-2xl backdrop-blur-sm">
                        <Button onClick={() => fileInputRef.current?.click()}>
                          Upload
                        </Button>
                        <Button>Remove</Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          hidden
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                    }
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
