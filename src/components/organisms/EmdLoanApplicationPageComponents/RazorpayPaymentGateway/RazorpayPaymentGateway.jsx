import React, { useEffect, useState } from "react";
import { MerchantId, WorkingKey, AccessCode } from "../../../../utils/Common";
import {
  initRazorpayPaymentGateways,
  razorpayCreateTrans,
  razorpayPaymentGatewaySelector,
  sendRazorpayResponse,
  clearRazorpayPaymentGatewayState,
  clearRazorpayPaymentGatewayData,
  clearRazorpayAfterPaymentStates
} from "../../../../redux/features/transaction/RazorpayPaymentSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../../atoms/Loading/Loading";
// import "https://checkout.razorpay.com/v1/checkout.js";

// const nodeCCAvenue = require("node-ccavenue");

// const ccav = new nodeCCAvenue.Configure({
//   merchant_id: MerchantId,
//   working_key: WorkingKey,
// });

const RazorpayPaymentGateway = (props) => {
  const { setOpenPaymentGateway2 } = props;
  // const [paymentDetailsObj, setpaymentDetailsObj] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isFetchingRazorpayPaymentInit,
    isSuccessResRazorpayPaymentInit,
    isErrorRazorpayPaymentInit,
    errorMsgRazorpayPaymentInit,
    razorpayPaymentInitData,
  } = useSelector(razorpayPaymentGatewaySelector);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let getOrdrDtls = localStorage.getItem("paymentDetails");
    if (getOrdrDtls) {
      let orderDtls = JSON.parse(getOrdrDtls);
      paymentInitFun(orderDtls);
      /* setpaymentDetailsObj(orderDtls);
      let send_obj = {
        "ApplicantId": orderDtls.ApplicantId,
        // "Amount": 500000
        "Amount": orderDtls.totalAmount
      };
      dispatch(razorpayCreateTrans(send_obj)); */
    } else {
      history.goBack();
    }
  }, []);

  /* useEffect(() => {
    if (isSuccessResRazorpayCreateTrans && razorpayCreateTransData?.TransactionId) {
      paymentInitFun();
    }
  }, [isSuccessResRazorpayCreateTrans, razorpayCreateTransData]); */

  const paymentInitFun = (orderDtls) => {
    const orderParams = {
      "mer_order_id": orderDtls.transactionId,
      "amount": orderDtls.totalAmount,
      // "amount": "500000",
      "appname": "Helioscart",
      "description": "Helioscart",
      "image": "",
      "origin": orderDtls.origin,
      "applicant_id": orderDtls.ApplicantId,
      "user_name": orderDtls.FirstName,
      "user_email": orderDtls.EmailId ? orderDtls.EmailId : "paymentgateway.bulk@heliosadvisory.com",
      "user_mobile": orderDtls.MobileNo,
      "useraddress": orderDtls.City
    };
    dispatch(initRazorpayPaymentGateways(orderParams));
  };

  useEffect(() => {
    if (isSuccessResRazorpayPaymentInit && razorpayPaymentInitData) {
      loadScript("https://checkout.razorpay.com/v1/checkout.js").then(() => {
        var options = {
          "key": razorpayPaymentInitData.key, // Enter the Key ID generated from the Dashboard
          "amount": razorpayPaymentInitData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": razorpayPaymentInitData.name,
          "description": razorpayPaymentInitData.description,
          "image": razorpayPaymentInitData.image,
          "order_id": razorpayPaymentInitData.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": (response) => {
            let send_obj = {
              "TransId": razorpayPaymentInitData.notes.trans_id,
              "UniqueId": razorpayPaymentInitData.notes.unique_id,
              "Origin": razorpayPaymentInitData.notes.origin,
              "checkout_logo": "https://cdn.razorpay.com/logo.png",
              "custom_branding": false,
              "org_logo": "",
              "org_name": "Razorpay Software Private Ltd",
              "razorpay_order_id": response.razorpay_order_id,
              "razorpay_payment_id": response.razorpay_payment_id,
              "razorpay_signature": response.razorpay_signature
            };
            dispatch(sendRazorpayResponse(send_obj));
          },
          "prefill": {
            ...razorpayPaymentInitData.prefill
          },
          "notes": {
            ...razorpayPaymentInitData.notes
          },
          "theme": {
            ...razorpayPaymentInitData.theme
          }
        };
        // eslint-disable-next-line no-undef
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        dispatch(clearRazorpayPaymentGatewayState());
        // dispatch(clearRazorpayPaymentGatewayData());
        setOpenPaymentGateway2(false);
      });
    }
  }, [isSuccessResRazorpayPaymentInit, razorpayPaymentInitData]);

  return (
    <>
      {(isFetchingRazorpayPaymentInit) && (
        <Loading isOpen={isFetchingRazorpayPaymentInit} />
      )}
      {/* <form
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
      </form> */}
    </>
  );
};

export default RazorpayPaymentGateway;
