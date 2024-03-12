import { CartItemType } from "../../App";
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItemType;
  handeleAddToCard: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handeleAddToCard }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
          <button onClick={() => handeleAddToCard(item)}>Add to cart</button>
          
    </Wrapper>
  );
};

export default Item;
