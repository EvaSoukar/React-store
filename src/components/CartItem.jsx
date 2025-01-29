import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, removeItem, removeOne } from "../store/features/shoppingCart/shoppingCartSlice";

const CartItem = ({ item }) => {
  
  const dispatch = useDispatch();
  const addOneToCart = () => {
    dispatch(addToCart(item.product));
  }

  const removeOneFromCart = () => {
    dispatch(removeOne(item.product._id));
  }

  const deleteItem = () => {
    dispatch(removeItem(item.product._id));
  }

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div className="flex items-center gap-2">
        <div className="w-[60px] aspect-square">
          <img src={item.product.images[1]} className="w-full h-full object-contain" alt={item.product.title} />
        </div>
        <div>
          <p className="font-semibold truncate max-w-[200px]">{item.product.name}</p>
          <p className="text-sm">{ item.quantity } x { item.product.price} </p>
        </div>
      </div>
      <div className="flex gap-3">
        <div>
          <button onClick={removeOneFromCart} className="bg-black text-white px-2 py-2 rounded-s-md border-r border-slate-700"><FaMinus className="size-3" /></button>
          <button onClick={addOneToCart} className="bg-black text-white px-2 py-2 rounded-e-md"><FaPlus className="size-3" /></button>
        </div>
        <button onClick={deleteItem} className="p-1"><FaTrash className="text-red-800" /></button>
      </div>
    </div>
  )
}
export default CartItem;