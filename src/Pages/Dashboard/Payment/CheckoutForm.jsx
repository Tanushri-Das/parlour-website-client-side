// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import React, { useEffect, useState } from "react";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const CheckoutForm = ({ price,name}) => {

//   console.log(price,name);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [cardError, setCardError] = useState("");
//   const { user } = useAuth();
//   const [axiosSecure] = useAxiosSecure();
//   const [clientSecret, setClientSecret] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [transactionId, setTransactionId] = useState("");

//   useEffect(() => {
//     if (price > 0) {
//       axiosSecure.post("/create-payment-intent", { price })
//       .then((res) => {
//         console.log(res.data.clientSecret);
//         setClientSecret(res.data.clientSecret);
//       });
//     }
//   }, [price, axiosSecure]);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!stripe || !elements) {
//   //     return;
//   //   }
//   //   const card = elements.getElement(CardElement);

//   //   if (card == null) {
//   //     return;
//   //   }
//   //   console.log("card", card);
//   //   // Use your card Element with other Stripe.js APIs
//   //   const { error, paymentMethod } = await stripe.createPaymentMethod({
//   //     type: "card",
//   //     card,
//   //   });
//   //   if (error) {
//   //     console.log("[error]", error);
//   //     setCardError(error.message);
//   //   } else {
//   //     setCardError("");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     const card = elements.getElement(CardElement);

//     if (card == null) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       setCardError(error.message);
//       // Clear the card element value if there's an error
//       card.clear();
//     } else {
//       setCardError("");
//     }
//     setProcessing(true);

//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             email: user?.email || "anonymous user email",
//             name: user?.displayName || "anonymous user name",
//           },
//         },
//       });

//     if (confirmError) {
//       console.log(confirmError);
//     }

//     setProcessing(false);

//     if (paymentIntent.status === "succeeded") {
//       setTransactionId(paymentIntent.id);
//       // save payment information to the server
//       const payment = {
//         email: user?.email,
//         transactionId: paymentIntent.id,
//         price,
//         date: new Date(),
//         serviceName: name
//       };
//       axiosSecure.post("/payments", payment)
//         .then((res) => {
//           console.log(res.data);
//           if (res.data.insertedId) {
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: "Payment added successfully",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           }
//         });
//     }

//     // Clear the card element value after a successful payment
//     card.clear();
//   };

//   return (
//     <div className="w-1/2 mx-auto">
//       <form onSubmit={handleSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//         <div className="flex justify-center items-center">
//           <button
//             type="submit"
//             className="login-btn text-[16px] font-semibold text-white mt-10"
//             disabled={!stripe || !clientSecret || processing}
//           >
//             Pay
//           </button>
//         </div>
//       </form>
//       {cardError && (
//         <p className="text-red-500 mt-8 text-lg font-medium">{cardError}</p>
//       )}

//     </div>
//   );
// };

// export default CheckoutForm;



import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import './CheckoutForm.css'

const CheckoutForm = ({ price, name, booking }) => {
  console.log(price, name, booking);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const { _id, serviceId } = booking;
  const navigate=useNavigate()

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      // Clear the card element value if there's an error
      card.clear();
    } else {
      setCardError("");
    }
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous user email",
            name: user?.displayName || "anonymous user name",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        serviceName: name,
        bookingId: _id,
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/bookingList");
        }
      });
    }

    // Clear the card element value after a successful payment
    card.clear();
  };

  return (
    <div className="w-full flex-shrink-0 sm:max-w-lg mx-auto border border-red-500">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="login-btn text-[16px] font-semibold text-white mt-10"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>
      {cardError && (
        <p className="text-red-500 mt-8 text-lg font-medium">{cardError}</p>
      )}
    </div>
  );
};

export default CheckoutForm;
