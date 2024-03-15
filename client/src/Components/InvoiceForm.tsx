import React, { useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import { myContext } from '../Contexts/myContext';
import { useContext } from 'react';
// import { ChangeEvent } from 'react';

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});


const InvoiceForm = () => {
//   const [invoiceNumber, setInvoiceNumber] = useState<string|number>(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const {items , setItems} = useContext(myContext);
  

  

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItems) => [
      ...prevItems,
      {
        id: id,
        prodName: '',
        qty: 1,
        rate: '1.00',
        total: 0,
      },
    ]);
  };

  const deleteItemHandler = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value } = event.target;

    setItems((prevItems) => prevItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [name]: value };
        return { ...updatedItem, total: updatedItem.qty * parseFloat(updatedItem.rate) };
      }
      return item;
    }));
  };

  const subtotal = items.reduce((prev, curr) => prev + Number(curr.rate) * curr.qty, 0);
  const gst = (18 * subtotal) / 100;
  const total = subtotal + gst;

  return (
    <form
      className="relative py-5 flex-col px-2 md:flex-row"
    //   onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              className="max-w-[130px]"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
            //   onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>
        <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
          <label
            htmlFor="cashierName"
            className="text-sm font-bold sm:text-base"
          >
            Cashier:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Cashier name"
            type="text"
            name="cashierName"
            id="cashierName"
            value={cashierName}
            onChange={(event) => setCashierName(event.target.value)}
          />
          <label
            htmlFor="customerName"
            className="col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Customer:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Customer name"
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
        </div>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>PRODUCT NAME</th>
              <th>QTY</th>
              <th className="text-center">RATE</th>
              <th className="text-center">TOTAL</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.prodName}
                qty={item.qty}
                rate={item.rate}
                total={item.total}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Total:</span>
            <span>INR {subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">GST:</span>
            <span>
              18%
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">GrandTotal:</span>
            <span className="font-bold">
              ₹ {total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
          <div className='border-gray-900/10'></div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky flex justify-end top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-40 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            NEXT{">>"}
          </button>
          {/* <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              cashierName,
              customerName,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          /> */}
          
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
