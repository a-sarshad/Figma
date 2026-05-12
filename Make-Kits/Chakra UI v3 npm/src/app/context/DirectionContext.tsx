import { createContext, useContext } from "react";

export type Direction = "ltr" | "rtl";

export const DirectionContext = createContext<Direction>("ltr");

export const useDirection = () => useContext(DirectionContext);
