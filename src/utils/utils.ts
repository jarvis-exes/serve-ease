import { Roles } from "@/enums/roles.enum";
import { getUser } from "./tokens";
import { useRef, useCallback } from "react";

export const useIsKitchen = () => {
    const user = getUser();
    return user?.role === Roles.KITCHEN;
}

export const useNotificationSound = (src: string = "./notification.wav") => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(src);
    audioRef.current.volume = 0.5;
  }

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0; 
    audioRef.current.play().catch(() => {});
  }, []);

  return play ;
};