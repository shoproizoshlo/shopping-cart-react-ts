import { useState } from "react";
import { useQuery } from "react-query";

import Item from "./Components/Items/Item";

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

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = () => null;

  const handeleAddToCard = (clickedItem: CartItemType) => null;
  const removeAddToCard = () => null;

  if (isLoading) return "Loading...";
  if (error) return "Error";

  return (
    <>
      <Wrapper>
        <div className="container">
          {data?.map((item) => (
            <div className="" key={item.id}>
              <Item item={item} handeleAddToCard={handeleAddToCard} />
            </div>
          ))}
        </div>
      </Wrapper>
    </>
  );
}

export default App;
