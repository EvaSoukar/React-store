import ProductCard from "./ProductCard";

export const ProductList = ({ products }) => {
  return (
    <div className="container m-auto px-2 pb-32">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

ProductList.Skeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div className="bg-gray-300/50 aspect-square rounded-lg animate-pulse"></div>
    </div>
  )
}