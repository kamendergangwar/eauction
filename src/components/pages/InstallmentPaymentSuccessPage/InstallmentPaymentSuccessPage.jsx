import React from 'react'
import PaymentSuccessLayout from '../Layout/PaymentSuccessLayout'
import InstallmentPaymentSuccessful from '../../organisms/ProfilePageComponents/MakeHousePayment/InstallmentPaymentSuccessfulComponents/InstallmentPaymentSuccessful'

const InstallmentPaymentSuccessPage = () => {
  return (
    <PaymentSuccessLayout>
      <InstallmentPaymentSuccessful />
    </PaymentSuccessLayout>
  )
}

export default InstallmentPaymentSuccessPage