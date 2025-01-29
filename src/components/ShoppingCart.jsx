import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import CartItem from "./CartItem";
import { clearCart } from "../store/features/shoppingCart/shoppingCartSlice";
import { createOrder } from "../store/features/orders/ordersSlice";


const ShoppingCart = ({ setIsOpen, isCheckoutPage }) => {

  const dispatch = useDispatch();

  const { cart, totalPrice } = useSelector(state => state.shoppingCart);

  // order history
  const { token } = useSelector(state => state.auth);
  const handleCheckout = () => {
    if (token) {
      const products = cart.map(product => {
        return {
          productId: product.product._id,
          quantity: product.quantity,
        }
      });
      dispatch(createOrder({ products }));
    }
      dispatch(clearCart());
  };

  return (
    <div className="text-black">
      <div>
        {
          cart.length <= 0 && (
            <div className="p-2 text-center">
              <p>Din kundvagn är tom!</p>
            </div>
          )
        }
        {
          cart.map(item => (
            <CartItem key={'cart_' + item.product._id} item={item} />
          ))
        }
      </div>
      <div className="flex justify-between items-center p-2">
        <div>
          <p>Totalt pris: {totalPrice}</p>
          <p className="text-black text-sm">Inkl. moms</p>
        </div>
        {
          isCheckoutPage
          ? <button onClick={handleCheckout} className="bg-black text-white py-1.5 px-6 rounded-lg">Beställ</button>
          : <Link onClick={() => setIsOpen(false)} to="/checkout" className="bg-black text-white py-1.5 px-6 rounded-lg">Till kassan</Link>
        }
      </div>
    </div>
  )
}
export default ShoppingCart;