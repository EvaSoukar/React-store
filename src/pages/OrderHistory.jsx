import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/features/orders/ordersSlice';
import { Link } from 'react-router';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getProductsCount = (order) => {
    if (!order.products) return 0
    const count = order.products.reduce((acc, current) => acc + current.quantity,
      0);
    return count;
  }

  return (
    <div className="container m-auto px-4 pb-12 text-black pt-12">
      <h2 className='text-xl text-orange-700 font-semibold pb-4'>Beställningshistorik</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <ul className='flex flex-col gap-4'>
          {orders.map((order) => (
            <li className='bg-orange-50 rounded-lg px-6 py-4 flex flex-col gap-4 max-w-fit' key={order._id}>
              <p className='font-semibold'>Ordernummer: {order._id}</p>
              <p className='max-w-[17ch] truncate'>Skapad: {order.createdAt}</p>
              <p>Antal produkter: {getProductsCount(order)}</p>
              <p>Totalpris: {order.totalPrice}:-</p>
              <button className='bg-orange-700 px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors text-black font-semibold'>
                <Link to={`/orderdetails/${order._id}`}>Visa detaljer...</Link>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;