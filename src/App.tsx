import { useState } from "react";
import { useQuery } from "react-query";

import Item from "./Components/Items/Item";
import Cart from "./Components/Cart/Cart";

import { Wrapper } from "./App.styles";
import { StyledButton } from "./App.styles";

import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Badge } from "@mui/material";
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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handeleAddToCard = (clickedItem: CartItemType) =>
    setCartItems((prev) => {
      //is the item already on cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //first time the item added to he cart
      return [...prev, { ...clickedItem, amount: 1 }];
    });

  const handeleRemoveFromCard = (id: number) =>
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );

  if (isLoading) return "Loading...";
  if (error) return "Error";

  return (
    <>
      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handeleAddToCard}
            removeFromCart={handeleRemoveFromCard}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>

        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handeleAddToCard={handeleAddToCard} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </>
  );
}

export default App;
