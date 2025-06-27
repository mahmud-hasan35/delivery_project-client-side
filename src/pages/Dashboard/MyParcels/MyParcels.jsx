import React from 'react'
import { useQuery } from '@tanstack/react-query'
import UseAuth from '../../../Hook/useAuth'
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

export default function MyParcels() {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-GB");
  };

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
    enabled: !!user?.email, // makes sure user is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleView = (parcel) => {
    alert(`Details of parcel:\n\nTracking ID: ${parcel.tracking_id}\nType: ${parcel.type}\nCost: $${parcel.cost}`);
  };

  const handlePay = (id) => {
    console.log("Paying for parcel:", id);
    navigate(`/dashboard/payment/${id}`)
    // Add your payment integration logic here
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are You Sure?',
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);
        if (res.data.deletedCount) {
          await Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The parcel has been deleted.',
            timer: 1500,
            showConfirmButton: false
          });
          refetch();
        } else {
          throw new Error("Parcel not found or already deleted.");
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: error.message || 'Something went wrong.',
        });
      }
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Parcel List</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.length > 0 ? (
            parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td className="capitalize">{parcel.type}</td>
                <td>{formatDate(parcel.creation_date)}</td>
                <td>${parcel.cost}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    } text-white`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleView(parcel)}
                    className="btn btn-sm btn-info text-white"
                  >
                    View
                  </button>
                  {parcel.payment_status === "unpaid" && (
                    <button
                      onClick={() => handlePay(parcel._id)}
                      className="btn btn-sm btn-success text-white"
                    >
                      Pay
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500">
                No parcels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
