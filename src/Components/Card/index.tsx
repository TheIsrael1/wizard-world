import { getRandomColor } from "@/util";
import React from "react";

interface CardInterface {
  children: React.ReactNode;
}

const Card = ({ children }: CardInterface) => {
  return (
    <div className="rounded-[4px] border border-white p-2">
      <div
        className={`w-full h-[100px]`}
        style={{ backgroundColor: getRandomColor() }}
      ></div>
      {children}
    </div>
  );
};

export default Card;
