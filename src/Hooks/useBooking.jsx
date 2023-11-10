import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBooking = () => {
  const { user ,loading} = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled:!loading,
    queryFn: async () => {
      const res = await axiosSecure(`/bookings?email=${user?.email}`);
      // console.log("res from axios", res);
      return res.data;
    },
  });
  return [bookings, refetch];
};
export default useBooking;
