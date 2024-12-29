<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setorderData(allOrdersItem.reverse());
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b border-[#d5006d] text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p className='text-[#d5006d]'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border border-[#d5006d] text-[#d5006d] px-4 py-2 text-sm font-medium rounded-sm hover:bg-[#d5006d] hover:text-white transition duration-300'>
                  Track Order
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
=======
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
    const { products, currency } = useContext(ShopContext);

    return (
        <div className='border-t border-pink-600 pt-16'>

            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {products.slice(1, 4).map((item, index) => (
                    <div 
                        key={index} 
                        className='py-4 border-t border-b border-pink-600 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        
                        <div className='flex items-start gap-6 text-sm'>
                            <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                            <div>
                                <p className='sm:text-base font-medium'>{item.name}</p>
                                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                    <p className='text-lg'>{currency}{item.price}</p>
                                    <p>Quantity: 1</p>
                                    <p>Size: L</p>
                                </div>
                                <p className='mt-2'>Date: <span className='text-gray-400'>25, May, 2024</span></p>
                            </div>
                        </div>

                        <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className='text-sm md:text-base'>Ready to ship</p>
                            </div>
                            <button 
                                className='border border-pink-600 bg-pink-600 text-white px-4 py-2 text-sm font-medium rounded-sm hover:bg-pink-700 transition-all'>
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
>>>>>>> 7a3663e7552d30f68f9013e5422f8a643d29c399
};

export default Orders;