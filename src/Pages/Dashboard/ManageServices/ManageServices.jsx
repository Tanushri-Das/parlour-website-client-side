// import React, { useState, useEffect } from "react";
// import useServices from "../../../Hooks/useServices";
// import { FaTrashAlt } from "react-icons/fa";
// import { HiOutlinePencilAlt } from "react-icons/hi";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const ManageServices = () => {
//   const [services, refetchServices] = useServices();
//   const [axiosSecure] = useAxiosSecure();
//   const [refresh, setRefresh] = useState(false);
//   // State variables to manage edited product name and price
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editedName, setEditedName] = useState("");
//   const [editedPrice, setEditedPrice] = useState("");

//   // State variable to track which item is being edited
//   const [editingService, setEditingService] = useState(null);

//   useEffect(() => {
//     if (refresh) {
//       // Refresh services data
//       refetchServices();
//       setRefresh(false);
//     }
//   }, [refresh, refetchServices]);

//   const handleEdit = (service) => {
//     // Set the editedName and editedPrice to the current values
//     setEditedName(service.service_name);
//     setEditedPrice(service.price);

//     // Set the editingService to the current service
//     setEditingService(service);

//     // Open the modal
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     // Close the modal
//     setIsModalOpen(false);
//   };

//   const handleUpdate = () => {
//     if (!editingService) {
//       console.log("No item is being edited");
//       return; // Ensure editingservice is defined
//     }

//     // Log the editedName, editedPrice, and item ID
//     console.log("Edited Product Name:", editedName);
//     console.log("Edited Price:", editedPrice);
//     console.log("Item ID:", editingService._id);

//     axiosSecure
//       .put(`/service/${editingService._id}`, {
//         name: editedName,
//         price: editedPrice,
//       })
//       .then((res) => {
//         console.log("updated res", res.data);
//         if (res.data.message) {
//           // Menu item updated successfully
//           fetchMenuData(); // Refresh menu data
//           document.getElementById("my_modal_1").close(); // Close the modal
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleDelete = (service) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure
//           .delete(`/services/${service._id}`)
//           .then((res) => {
//             if (res.data.deletedCount > 0) {
//               Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Service deleted successfully",
//                 showConfirmButton: false,
//                 timer: 1500,
//               });
//               setRefresh(true);
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//     });
//   };

//   return (
//     <div className="my-12">
//       <h5 className="text-[22px] font-medium text-center mb-6">
//         Manage Services
//       </h5>
//       <table className="w-1/2 lg:w-3/4 divide-y divide-gray-200 mx-auto">
//         <thead className="bg-gray-50">
//           <tr>
//             <th
//               scope="col"
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//             >
//               #
//             </th>
//             <th
//               scope="col"
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//             >
//               Service Name
//             </th>
//             <th
//               scope="col"
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//             >
//               Price
//             </th>
//             <th
//               scope="col"
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//             >
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {services?.map((service, index) => (
//             <tr key={service._id}>
//               <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {service.service_name}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">{service.price}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <button
//                   onClick={() => handleEdit(service)}
//                   className="bg-green-600 text-white py-2 px-4 rounded-lg me-2 sm:me-0 mb-2 sm:mb-0 sm:ml-2"
//                 >
//                   <HiOutlinePencilAlt className="text-xl" />
//                 </button>
//                 <Modal
//                   isOpen={isModalOpen}
//                   onClose={handleCloseModal}
//                   onConfirm={handleUpdate}
//                 />

//                 <button
//                   onClick={() => handleDelete(service)}
//                   className="bg-red-600 text-white py-2 px-4 rounded-lg"
//                 >
//                   <FaTrashAlt className="text-lg" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageServices;

import React, { useState, useEffect } from "react";
import useServices from "../../../Hooks/useServices";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Modal from "./Modal"; // Import the Modal component

const ManageServices = () => {
  const { services, loading, refetchServices } = useServices();

  const [axiosSecure] = useAxiosSecure();
  const [refresh, setRefresh] = useState(false);
  // State variable to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    if (refresh) {
      // Refresh services data
      refetchServices();
      setRefresh(false);
    }
  }, [refresh, refetchServices]);

  const handleEdit = (service) => {
    // Set the editedName and editedPrice to the current values
    setEditedName(service.service_name);
    setEditedPrice(service.price);

    // Set the editingService to the current service
    setEditingService(service);

    // Open the modal
    setIsModalOpen(true);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9.]/g, "");
    setEditedPrice(numericValue);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    if (!editingService) {
      console.log("No item is being edited");
      return; // Ensure editingservice is defined
    }

    // Log the editedName, editedPrice, and item ID
    console.log("Edited Product Name:", editedName);
    console.log("Edited Price:", editedPrice);
    console.log("Item ID:", editingService._id);

    axiosSecure
      .put(`/services/${editingService._id}`, {
        name: editedName,
        price: editedPrice,
      })
      .then((res) => {
        console.log("updated res", res.data);
        if (res.data.message) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Service updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setRefresh(true);
          handleCloseModal();

          // After successfully updating the service, refetch the data
          refetchServices();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (service) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/services/${service._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Service deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              setRefresh(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="my-12">
      <h5 className="text-[22px] font-medium text-center mb-6">
        Manage Services
      </h5>
      <table className="w-1/2 lg:w-3/4 divide-y divide-gray-200 mx-auto">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              #
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Service Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services?.map((service, index) => (
            <tr key={service._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {service.service_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{service.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg me-2 sm:me-0 mb-2 sm:mb-0 sm:ml-2"
                >
                  <HiOutlinePencilAlt className="text-xl" />
                </button>
                <button
                  onClick={() => handleDelete(service)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg"
                >
                  <FaTrashAlt className="text-lg" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleUpdate}
        service={editingService}
        editedName={editedName}
        editedPrice={editedPrice}
        onNameChange={handleNameChange}
        onPriceChange={handlePriceChange}
      />
    </div>
  );
};

export default ManageServices;
