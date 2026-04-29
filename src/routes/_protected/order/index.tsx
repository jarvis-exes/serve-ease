import { socket } from "@/socket";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { CartItem, ItemType, Order } from "@/models/menu.model";
import CategoriesPannel from "./-components/CategoriesPannel";
import ItemsPannel from "./-components/ItemsPannel";
import CartPannel from "./-components/CartPannel";
import { toast } from "react-toastify";
import { useIsMobile } from "@/utils/mobile";
import { FaCartShopping } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useGetMenu } from "./-query-hooks";
import { getOutletId } from "@/utils/tokens";
import SearchItems from "./-components/SearchItems";
import { useNotificationSound } from "@/utils/utils";

const OrderPage = () => {
  const isMobile = useIsMobile();
  const outletId = getOutletId();
  const play = useNotificationSound();

  const { data, isLoading } = useGetMenu(outletId);

  const [items, setItems] = useState<ItemType[]>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const categories = useMemo(
    () => data?.categories.filter((c) => c.isActive),
    [data],
  );

  const allItems = useMemo(
    () =>
      categories?.flatMap(
        (category) =>
          category.subCategories
            ?.filter((subCategory) => subCategory.isActive)
            .flatMap(
              (subCategory) =>
                subCategory.items?.filter((item) => item.isActive) ?? [],
            ) ?? [],
      ) ?? [],
    [categories],
  );

  useEffect(() => {
    socket.on("get_ready_order", (order: Order) => {
      play();
      toast.success(`Order Ready #${order.tokenNumber}`);
    });

    return () => {
      socket.off("get_ready_order");
    };
  }, []);

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  if (isMobile)
    return (
      <AnimatePresence mode="wait">
        {showCart ? (
          <motion.div
            key="cart"
            initial={{ y: "100%", opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 1 }}
            transition={{
              type: "spring",
              ease: "easeOut",
              duration: 0.2,
            }}
            className="p-2 h-full"
          >
            <CartPannel
              cart={cart}
              setCart={setCart}
              setShowCart={setShowCart}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main-ui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              ease: "easeOut",
              duration: 0.2,
            }}
            className="flex flex-col gap-2 h-full"
          >
            <div className="rounded-xl flex items-center justify-between gap-2 p-2 pb-0">
              <SearchItems items={allItems} setCart={setCart} />
              {totalItems > 0 && (
                <div
                  onClick={() => setShowCart(true)}
                  className="bg-green-medium h-full flex gap-2 justify-center items-center px-3 rounded-2xl text-white"
                >
                  <div>
                    <FaCartShopping className="w-7 h-7" />
                  </div>
                  <div className="text-2xl h-full flex items-center">
                    {totalItems}
                  </div>
                </div>
              )}
            </div>
            <div className="flex h-full gap-2 p-2 overflow-auto">
              <CategoriesPannel
                selectItems={setItems}
                categories={categories}
                isLoading={isLoading}
              />
              {items && <ItemsPannel items={items} setCart={setCart} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );

  return (
    <div className="flex flex-col w-full h-full p-2 md:p-3 gap-2 md:gap-3">
      <SearchItems items={allItems} setCart={setCart} />
      <div className="flex w-full h-full overflow-auto">
        <CategoriesPannel
          selectItems={setItems}
          categories={categories}
          isLoading={isLoading}
        />
        <ItemsPannel items={items} setCart={setCart} />
        <CartPannel cart={cart} setCart={setCart} setShowCart={setShowCart} />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_protected/order/")({
  component: OrderPage,
});
