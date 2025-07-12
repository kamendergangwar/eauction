import React from 'react'
import PaymentSuccessLayout from '../Layout/PaymentSuccessLayout'
import NocPaymentSuccessful from '../../organisms/NocPaymentSuccessfulComponents/NocPaymentSuccessful'

const NocPaymentSuccessPage = () => {
  return (
    <PaymentSuccessLayout>
      <NocPaymentSuccessful />
    </PaymentSuccessLayout>
  )
}

export default NocPaymentSuccessPage