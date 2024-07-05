import React, { useState, useEffect } from "react";
import useServices from "../../../Hooks/useServices";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Modal from "./Modal";

const ManageServices = () => {
  const { services, loading, refetchServices } = useServices();

  const [axiosSecure] = useAxiosSecure();
  const [refresh, setRefresh] = useState(false);
  // State variable to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (refresh) {
      // Refresh services data
      refetchServices();
      setRefresh(false);
    }
  }, [refresh, refetchServices]);

  // Update handleEdit to set the selected service
  const handleEdit = (service) => {
    setEditedName(service.service_name);
    setEditedPrice(service.price);
    setEditingService(service);
    setSelectedService(service); // Set the selected service here
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
    <div>
      <div className="font-bold uppercase flex justify-center mt-16 items-center">
        <h3 className="text-3xl"> Manage Services</h3>
      </div>
      <div className="mt-10">
      <table className="min-w-full divide-y divide-gray-200">
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
              Service Name
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
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services?.map((service, index) => (
            <tr key={service._id}>
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                {service.service_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">{service.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg me-2 sm:me-0 mb-2 sm:mb-0 sm:ml-2"
                >
                  <HiOutlinePencilAlt className="text-xl" />
                </button>
                <button
                  onClick={() => handleDelete(service)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg ms-2"
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      

      {/* Pass the selectedService to the Modal only when isModalOpen is true */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleUpdate}
          service={selectedService} // Use selectedService instead of editingService
          editedName={editedName}
          editedPrice={editedPrice}
          onNameChange={handleNameChange}
          onPriceChange={handlePriceChange}
        />
      )}
    </div>
  );
};

export default ManageServices;
