import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`https://js2-ecommerce-api.vercel.app/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(res.data);
        console.log("€€€€",res.data)
      } catch (error) {
        setError('Something went wrong!');
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getOrder();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container m-auto px-4 pb-12 text-orange-100 pt-12">
      <h2 className='text-xl text-orange-700 font-semibold pb-4'>Beställningsdetaljer</h2>
      {order && (
        <div>
          <p className='mb-2'>Ordernummer: {order._id}</p>
          <h3 className='mb-2 font-semibold'>Produkter:</h3>
          <ul>
            {order.products.map((product) => (
              <li className='flex gap-2 items-center mb-8 bg-orange-50 rounded-lg text-black px-6 py-4 max-w-[600px]' key={product.product._id}>
                <img src={product.product.images[1]} className="w-20 h-20 rounded-lg" alt={product.product.name}/>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-semibold'>{product.product.name}</p>
                  <p className='text-sm'>Pris: {product.product.price}:-</p>
                  <p className='text-sm'>Antal produkter: {product.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;