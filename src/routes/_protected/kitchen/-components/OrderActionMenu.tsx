import React from "react";
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteOrder } from "../-query-hooks";
import { toast } from "react-toastify";
import { HiDotsVertical } from "react-icons/hi";

interface OrderActionMenuProps {
  orderId: string;
}

export const OrderActionMenu: React.FC<OrderActionMenuProps> = ({
  orderId,
}) => {
  const { mutate: deleteOrder, isPending } = useDeleteOrder({
    onError: () => {
      toast.error('Failed to delete order');
    },
  });

  const handleDelete = () => {
    deleteOrder(orderId);
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Order actions"
        >
          <HiDotsVertical size={18} />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          sideOffset={5}
          align="end"
          className="z-50 bg-white border border-gray-200 rounded-lg shadow-lg min-w-max data-[state='open']:animate-pop-in data-[state='closed']:animate-pop-out"
        >
          <Dropdown.Item
            onSelect={handleDelete}
            disabled={isPending}
            className="px-4 py-2 flex items-center gap-2 text-red-600 font-semibold hover:bg-red-50 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RiDeleteBin6Line size={18} />
            {isPending ? "Deleting..." : "Delete Order"}
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};
