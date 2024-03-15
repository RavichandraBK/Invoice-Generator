import React from 'react';
import levitationLogo from '../assets/levitation_logo.jpg';
import { myContext } from '../Contexts/myContext';
import { useContext } from 'react';

interface Item {
  id: string;
  prodName: string;
  qty: number;
  rate: string;
  total: number;
}

const InvoicePdf: React.FC = () => {
  const { items } = useContext(myContext);

  const subtotal = items.reduce((prev, curr) => prev + Number(curr.rate) * curr.qty, 0);
  const gst = (18 * subtotal) / 100;
  const total = subtotal + gst;
console.log(items[1].prodName)
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-3/4">
        <div className="flex justify-between items-center py-12 px-6">
          <p className="text-5xl">INVOICE GENERATOR</p>
          <img src={levitationLogo} alt="Levitation Logo" className="w-54 h-54" />
        </div>
        <table className="min-w-80 p-4 text-left w-full">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>Product</th>
              <th>Qty</th>
              <th className="text-center">Rate</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody className="border-gray-900/10 min-w-96">
            {items.map((prd: Item) => (
              <tr key={prd.id}>
                <td className="w-60">{prd.prodName}</td>
                <td className="min-w-[65px] md:min-w-[80px] ">{prd.qty}</td>
                <td className="relative min-w-[100px] md:min-w-[150px] text-center">{prd.rate}</td>
                <td className="relative min-w-[100px] md:min-w-[150px] text-center">{prd.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
            <div className='border-gray-900/10  w-full border-t'></div>
        <div className="flex justify-end items-center my-10 px-0">
          <div className="space-y-2">
            <div className="flex justify-between w-96">
              <span className="font-bold">Total:</span>
              <span>INR {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-96">
              <span className="font-bold">GST:</span>
              <span>18%</span>
            </div>
            <div className="flex justify-between w-96 border-t border-gray-900/10 pt-2">
              <span className="font-bold">GrandTotal:</span>
              <span className="font-bold">₹ {total % 1 === 0 ? total : total.toFixed(2)}</span>
            </div>
        <div className='border-gray-900/10 w-full border-t'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePdf;
