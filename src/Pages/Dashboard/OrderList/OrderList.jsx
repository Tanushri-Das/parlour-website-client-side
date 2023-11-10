// import React from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const OrderList = () => {
//   const [axiosSecure] = useAxiosSecure();
//   const { data: orders = [] } = useQuery({
//     queryKey: ["orders"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/orders");
//       return res.data;
//     },
//   });
//   return (
//     <div>
//       <div className="font-bold uppercase flex justify-center mt-16 items-center">
//         <h3 className="text-3xl">Total Orders : {orders.length}</h3>
//       </div>
//       <div className="mt-10 md:w-3/4 md:mx-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xl font-medium"
//               >
//                 #
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xl font-medium"
//               >
//                 Name
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xl font-medium"
//               >
//                 Email
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xl font-medium"
//               >
//                 Price
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xl font-medium"
//               >
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {Array.isArray(orders) &&
//               orders.map((order, index) => (
//                 <tr key={order._id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{index + 1}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{order.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{order.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{order.price}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
//                     {order.paid ? "ClearPayment" : "Payment Due"}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
      
//     </div>
//   );
// };

// export default OrderList;





import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import './OrderList.css'

const OrderList = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });
  return (
    <div>
      <div className="font-bold uppercase flex justify-center mt-16 items-center">
        <h3 className="text-3xl">Total Orders: {orders.length}</h3>
      </div>
      <div className="mt-10">
        <table className="min-w-full divide-y divide-gray-200 responsive-table">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xl font-medium"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xl font-medium"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xl font-medium"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xl font-medium"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xl font-medium"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(orders) &&
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                    {order.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                    {order.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                    {order.paid ? "Clear Payment" : "Payment Due"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;

