import { Link } from "react-router";

const Hero = ({ products }) => {
  if (products.length < 1) {
    return null;
  }

  return (
    <div className="mb-8 bg-orange-700 flex flex-col md:flex-row justify-between gap-6 items-center p-6 lg:p-12 relative overflow-hidden">
      <div className="z-20 bg-black/10 w-full h-full absolute top-0 left-0"></div>
      <div className="z-40 text-center ">
        <h1 className="max-w-[500px] md:text-3xl pb-4 text-black font-semibold">Kolla in våra senaste erbjudanden...</h1>
        <p className="min-w-[100px] truncate font-bold md:text-2xl lg:text-2xl pb-10">{products[0].name}</p>
        <Link to={`/products/${products[0]._id}`} className="md:text-2xl bg-black py-3 px-8 rounded-lg text-orange-700 font-bold hover:text-orange-600">Köp Nu</Link>
      </div>
      <div className="max-w-[600px] max-h-[400px] rounded-lg">
          <img className="min-w-[600px object-cover rounded-lg rotate-12" src={products[0].images[2]} alt="" />
      </div>
    </div>
  )
}
export default Hero;