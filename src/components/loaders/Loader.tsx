import type { FC } from "react";
import "./style.css";
import { twMerge } from "tailwind-merge";

type LoaderProps = {
  type: "pizza" | "juice" | "tarbooj";
  classes?: string;
};

const Loader: FC<LoaderProps> = ({ type, classes }) => {
  return <div className={twMerge(type, classes)}></div>;
};

export default Loader;
