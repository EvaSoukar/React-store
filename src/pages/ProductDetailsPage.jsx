import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BiSolidCartAdd } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/features/shoppingCart/shoppingCartSlice";

const ProductDetailsPage = () => {

  const{ productId } = useParams();
  
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    const getProduct = async () => {
      if (!loading)
      try {
        const res = await axios.get(`https://js2-ecommerce-api.vercel.app/api/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        setError('Something went wrong!');
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [])

  const handleClick = () => {
    dispatch(addToCart(product));
  }

  if(error) {
    return (
      <div className="mt-10">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if(loading || !product) {
    return (
      <div className="mt-5">
        <div className="w-full aspect-video bg-gray-300/30 rounded-lg animate-pulse" />
        <div className="mt-4 w-1/2 h-7 bg-gray-300/30 rounded-lg" />
      </div>
    )
  }

  return (
    <div className="container m-auto px-2 py-12">
      <div className="md:flex gap-6">
        <div className="md:max-w-[50%]">
          <p className="mb-4 md:text-2xl rounded-lg font-semibold max-w-fit">{product.name}</p>
          <h3 className="text-orange-700 font-semibold my-2">Produktbeskrivning:</h3>
          <p className={isExpanded ? "max-h-fit" :"max-h-[190px] overflow-hidden"}>{product.description}</p>
          <button className="my-4 text-orange-700" onClick={() => setIsExpanded(state => !state)}>{isExpanded ? "Visa midre -" : "Visa mer +"}</button>
        </div>
        <div className="mb-8 grid grid-cols-2 grid-rows-2 gap-2 rounded-lg overflow-hidden md:max-w-[50%] max-h-[400px]">
          {product.images.map((image, index) => (<img key={index} className="h-full object-cover w-full transform transition-transform duration-300 hover:scale-150" src={image}></img>))}
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 mt-4">
        <p className="text-orange-700">Pris: {product.price}:-</p>
        <button onClick={handleClick} className="flex items-center gap-2 bg-orange-700 px-10 py-2 rounded-lg hover:bg-orange-600 transition-colors text-black font-semibold">Lägg till <BiSolidCartAdd /></button>
      </div>
      
    </div>
  )
}
export default ProductDetailsPage;