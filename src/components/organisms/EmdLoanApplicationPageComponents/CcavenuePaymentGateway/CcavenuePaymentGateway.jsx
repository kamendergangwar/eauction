import React, { useEffect } from "react";
import { MerchantId, WorkingKey, AccessCode } from "../../../../utils/Common";
const nodeCCAvenue = require("node-ccavenue");

const ccav = new nodeCCAvenue.Configure({
  merchant_id: MerchantId,
  working_key: WorkingKey,
});

const CcavenuePaymentGateway = (props) => {
  const { totalBill, applicantDetails } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const orderParams = {
    // order_id: 8765432,
    order_id: new Date().getTime(),
    currency: "INR",
    amount: totalBill,
    redirect_url: encodeURIComponent(
      `https://rest-api.helioscart.com/rest-api/applicationservice/CcavenuePayment/ccavResponseHandler`
    ),
    cancel_url: encodeURIComponent(`http://localhost:3000/make-payments`),
    // cancel_url: encodeURIComponent(`https://v2-beta.helioscart.com/make-payments`),
    billing_name: applicantDetails.FirstName,
    billing_address: applicantDetails.City,
    billing_city: applicantDetails.District,
    billing_state: applicantDetails.State,
    billing_zip: applicantDetails.Pincode,
    billing_country: "India",
    billing_tel: applicantDetails.MobileNo,
    billing_email: applicantDetails.EmailId
      ? applicantDetails.EmailId
      : "paymentgateway.bulk@heliosadvisory.com",
    integration_type: "iframe_normal",
    language: localStorage.getItem("i18nextLng"),
  };

  console.log("orderParams", JSON.stringify(orderParams));
  const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
  console.log("encryptedOrderData", encryptedOrderData);

  useEffect(() => {
    document.forms["redirect"].submit();
  }, [orderParams]);

  return (
    <>
      <form
        method="post"
        name="redirect"
        action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
      >
        <input
          type="hidden"
          id="encRequest"
          name="encRequest"
          value={encryptedOrderData}
        />
        <input
          type="hidden"
          name="access_code"
          id="access_code"
          value={AccessCode}
        />
      </form>
    </>
  );
};

export default CcavenuePaymentGateway;
