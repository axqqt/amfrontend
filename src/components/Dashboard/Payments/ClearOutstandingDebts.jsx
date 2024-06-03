/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Axios from "axios";

const ClearOutstandingDebts = () => {
  const stripePromise = loadStripe('your-publishable-key-here');

  const { id } = useParams();
  const { loading, setLoading, BASE, status, setStatus, company, setCompany } = useContext(UserContext);
  const companyId = id;
  const [clearance, setClearance] = useState({});
  const stripe = useStripe();
  const elements = useElements();

  async function clearDebts() {
    try {
      setLoading(true);
      const response = JSON.parse(localStorage.getItem("companyDebts"));
      setClearance(response?.outstandingBalance);

      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error(error);
        setStatus('Payment failed');
        return;
      }

      const paymentResponse = await Axios.post(`${BASE}/companys/pay`, {
        amount: clearance,
        paymentMethodId: paymentMethod.id,
        companyId
      });

      if (paymentResponse.data.success) {
        setStatus('Payment successful');
      } else {
        setStatus('Payment failed');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Elements stripe={stripePromise}>
      <div>
        <div className="sub-container">
          <h1>Clear Outstanding Debts</h1>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <div className="outstanding-debts">
                <span>
                  <label>Outstanding balance: {clearance}</label>
                </span>
                <CardElement />
                <button onClick={clearDebts}>Clear Debts!</button>
              </div>
              <h2>{status}</h2>
            </div>
          )}
        </div>
      </div>
    </Elements>
  );
};

export default ClearOutstandingDebts;
