import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/features/products/productsSlice";
import { ProductList } from "../components/ProductList";
import CategoryDropdown from '../components/CategoryDropdown';
import Hero from "../components/Hero";

const HomePage = () => {

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { products, error, loading } = useSelector(state => state.productList);

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (error) {
    return (
      <div>
        <p className="text-red-500 mt-10">{ error }</p>
      </div>
    )
  }

  return (
    <div>
      <Hero products={products} />
      <div className="container m-auto px-2 py-6">
        <h2 className="text-3xl">Våra Produkter</h2>
      </div>
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {
        loading
        ? <ProductList.Skeleton />
        : <ProductList products={filteredProducts} />
      }
    </div>
  )
}
export default HomePage;