import { useState } from "react";
import { useQuery } from "react-query";

import { Wrapper } from "./App.styles";

import "./App.css";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType> =>
  await (
    await fetch("https://fakestoreapi.com/products")
  ).json;

function App() {
  return <>start</>;
}

export default App;
