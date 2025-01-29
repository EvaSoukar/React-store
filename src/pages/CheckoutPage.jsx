import ShoppingCart from "../components/ShoppingCart";

const CheckoutPage = () => {
  return (
    <div className="container m-auto px-4 text-orange-100 pt-12">
      <div className="bg-white rounded-lg">
        <ShoppingCart isCheckoutPage />
      </div>
    </div>
  )
}
export default CheckoutPage;