const returnRequest = {
  customerName: "Johan",
  productName: "Trådlösa hörlurar",
  productPrice: 899,
  daysSincePurchase: 45,
  hasReceipt: true,
};

const getReturnStatus = (hasReceipt, daysSincePurchase) => {
  console.log("getReturnStatus fick:", hasReceipt, daysSincePurchase);

  if (hasReceipt === false) {
    return "Kvitto saknas";
  }

  // 45 dagar är mer än returgränsen på 30 dagar.
  if (daysSincePurchase <= 30) {
    return "Retur godkänd";
  } else {
    return "Returperioden har gått ut";
  }
};

const calculateRefund = (status, productPrice) => {
  if (status === "Retur godkänd") {
    return productPrice;
  } else {
    return 0;
  }
};

// Argumentens ordning följer parametrarna hasReceipt och daysSincePurchase.
const status = getReturnStatus(
  returnRequest.hasReceipt,
  returnRequest.daysSincePurchase,
);
const refundAmount = calculateRefund(status, returnRequest.productPrice);

console.log("Returstatus:", status);
console.log("Återbetalning:", refundAmount);

document.querySelector("#customer-name").textContent =
  returnRequest.customerName;
document.querySelector("#product-name").textContent = returnRequest.productName;
document.querySelector("#return-status").textContent = status;
document.querySelector("#refund-amount").textContent = `${refundAmount} kr`;
