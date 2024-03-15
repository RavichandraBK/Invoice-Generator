import  { createContext, useContext, Dispatch, SetStateAction } from 'react';
interface Item {
    id: string;
    prodName: string;
    qty: number;
    rate: string;
    total: number;
  }
interface MyContextValue {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
}

const defaultValue: MyContextValue = {
  items: [],
  setItems: () => {},
};

export const myContext = createContext<MyContextValue>(defaultValue);

export const useMyContext = () => useContext(myContext);
