const returnRequest = {
  customerName: "Johan",
  productName: "Trådlösa hörlurar",
  productPrice: 899,
  daysSincePurchase: 45,
  hasReceipt: true,
};

const getReturnStatus = (hasReceipt, daysSincePurchase) => {
  console.log("getReturnStatus fick:", hasReceipt, daysSincePurchase);

  // TODO: Returnera rätt status enligt returreglerna.
};

const calculateRefund = (status, productPrice) => {
  // TODO: Returnera rätt återbetalning.
};

const status = getReturnStatus(
  returnRequest.daysSincePurchase,
  returnRequest.hasReceipt,
);
const refundAmount = calculateRefund(status, returnRequest.productPrice);

console.log("Returstatus:", status);
console.log("Återbetalning:", refundAmount);

document.querySelector("#customer-name").textContent =
  returnRequest.customerName;
document.querySelector("#product-name").textContent = returnRequest.productName;
document.querySelector("#return-status").textContent = status;
document.querySelector("#refund-amount").textContent = `${refundAmount} kr`;
