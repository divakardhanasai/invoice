import React, { useState } from 'react';
import InvoiceTemplate from './InvoiceTemplate';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const [data, setData] = useState({
    logo: 'path/to/logo.png',
    invoiceNo: 'INV-123',
    invoiceDate: '2024-06-24',
    orderNo: 'ORD-456',
    orderDate: '2024-06-20',
    sellerName: 'ABC Corp',
    sellerAddress: '123 Main St, Anytown, State, 123456',
    sellerPAN: 'ABCDE1234F',
    sellerGST: '12ABCDE3456F7Z8',
    billingName: 'John Doe',
    billingAddress: '789 Secondary St, Othertown, State, 654321',
    billingStateCode: '09',
    shippingName: 'John Doe',
    shippingAddress: '789 Secondary St, Othertown, State, 654321',
    shippingStateCode: '09',
    placeOfSupply: 'State',
    placeOfDelivery: 'State',
    items: [
      {
        description: 'Item 1',
        unitPrice: 100,
        quantity: 2,
        discount: 10,
        taxRate: 18
      },
      {
        description: 'Item 2',
        unitPrice: 200,
        quantity: 1,
        discount: 0,
        taxRate: 18
      }
    ],
    signature: 'path/to/signature.png'
  });

  const generatePDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('invoice.pdf');
      });
  };

  return (
    <div className="App">
      <div id="invoice">
        <InvoiceTemplate data={data} />
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default App;
