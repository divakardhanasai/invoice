import React from 'react';
import './InvoiceTemplate.css';

const InvoiceTemplate = ({ data }) => {
  const computeNetAmount = (unitPrice, quantity, discount) => {
    return unitPrice * quantity - discount;
  };

  const computeTaxAmount = (netAmount, taxRate) => {
    return netAmount * (taxRate / 100);
  };

  const computeTotalAmount = (netAmount, taxAmount) => {
    return netAmount + taxAmount;
  };

  const totalNetAmount = data.items.reduce((total, item) => total + computeNetAmount(item.unitPrice, item.quantity, item.discount), 0);
  const totalTaxAmount = data.items.reduce((total, item) => total + computeTaxAmount(computeNetAmount(item.unitPrice, item.quantity, item.discount), item.taxRate), 0);
  const totalAmount = totalNetAmount + totalTaxAmount;

  const amountInWords = (num) => {
    const a = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num)
      .substr(-9)
      .match(/^(\d{2})(\d{3})(\d{3})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = '';
    str += n[1] !== '00' ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' crore ' : '';
    str += n[2] !== '000' ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' lakh ' : '';
    str += n[3] !== '000' ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' thousand ' : '';
    str += n[4] !== '0' ? a[Number(n[4])] + ' hundred ' : '';
    str += n[5] !== '00' ? (str !== '' ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' only' : '';
    return str;
  };

  return (
    <div className="invoice-box">
      <table cellpadding="0" cellspacing="0">
        <tr className="top">
          <td colspan="2">
            <table>
              <tr>
                <td className="title">
                  <img src={data.logo} style={{ width: '100%', maxWidth: '300px' }} alt="Company logo" />
                </td>
                <td>
                  Invoice #: {data.invoiceNo}<br />
                  Created: {data.invoiceDate}<br />
                  Order #: {data.orderNo}<br />
                  Order Date: {data.orderDate}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr className="information">
          <td colspan="2">
            <table>
              <tr>
                <td>
                  <strong>Seller Details:</strong><br />
                  {data.sellerName}<br />
                  {data.sellerAddress}<br />
                  PAN No.: {data.sellerPAN}<br />
                  GST Registration No.: {data.sellerGST}
                </td>
                <td>
                  <strong>Billing Details:</strong><br />
                  {data.billingName}<br />
                  {data.billingAddress}<br />
                  State Code: {data.billingStateCode}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr className="information">
          <td colspan="2">
            <table>
              <tr>
                <td>
                  <strong>Shipping Details:</strong><br />
                  {data.shippingName}<br />
                  {data.shippingAddress}<br />
                  State Code: {data.shippingStateCode}
                </td>
                <td>
                  Place of Supply: {data.placeOfSupply}<br />
                  Place of Delivery: {data.placeOfDelivery}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr className="heading">
          <td>Description</td>
          <td>Price</td>
        </tr>
        {data.items.map((item, index) => (
          <tr className="item" key={index}>
            <td>{item.description}<br />Qty: {item.quantity} | Discount: {item.discount}%</td>
            <td>{computeNetAmount(item.unitPrice, item.quantity, item.discount)}</td>
          </tr>
        ))}
        <tr className="total">
          <td></td>
          <td>Total: {totalAmount}</td>
        </tr>
        <tr className="total">
          <td></td>
          <td>Amount in words: {amountInWords(totalAmount)}</td>
        </tr>
      </table>
      <div className="signature">
        For {data.sellerName}:<br />
        <img src={data.signature} alt="Signature" /><br />
        Authorised Signatory
      </div>
    </div>
  );
};

export default InvoiceTemplate;
