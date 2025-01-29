import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="bg-white rounded-lg overflow-hidden">
      <div className="w-full aspect-square">
        <img src={product.images[0]} alt="" className="object-contain w-full h-full px-2" />
      </div>
      <div className="bg-orange-700 text-black p-4">
        <p className="truncate font-bold">{product.name}</p>
        <p className="font-semibold text-orange-100">{product.price}:-</p>
      </div>
    </Link>
  )
}
export default ProductCard;