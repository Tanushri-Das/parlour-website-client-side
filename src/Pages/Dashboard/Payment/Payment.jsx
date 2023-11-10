// import React from "react";
// import { useLocation } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

// const Payment = () => {
//   const { search } = useLocation();
//   const searchParams = new URLSearchParams(search);
//   const price = searchParams.get("price");
//   const name = decodeURIComponent(searchParams.get("name")); // Decode the service name

//   return (
//     <div>
//       <h2 className="text-3xl font-medium mb-16 text-center">PAYMENT</h2>
//       <p className="mb-6">Service Price: ${price ? parseFloat(price).toFixed(2) : 0}</p>
//       <p className="mb-6">Service Name: {name}</p>
//       <Elements stripe={stripePromise}>
//         <CheckoutForm price={price} name={name}/>
//       </Elements>
//     </div>
//   );
// };

// export default Payment;











import React from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const price = searchParams.get("price");
  const name = decodeURIComponent(searchParams.get("name")); // Decode the service name
  const booking = useLoaderData();
  console.log("book", booking);

  return (
    <div>
      <h2 className="text-3xl font-medium mb-16 text-center">PAYMENT</h2>
      <p className="mb-6">Service Price: ${price ? parseFloat(price).toFixed(2) : 0}</p>
      <p className="mb-6">Service Name: {name}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} name={name} booking={booking}/>
      </Elements>
    </div>
  );
};

export default Payment;
