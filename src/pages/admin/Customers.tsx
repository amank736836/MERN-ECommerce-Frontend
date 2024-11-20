import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import CustomerTable, {
  CustomerDataType,
} from "../../components/admin/Tables/CustomerTable";
import { SkeletonLoader } from "../../components/loader";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";
import { Navigate } from "react-router-dom";

const Customer = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllUsersQuery(user?._id!);
  const [loading, setLoading] = useState<boolean>(false);

  const [customers, setCustomers] = useState<CustomerDataType[]>([]);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = (userId: string) => async () => {
    setLoading(true);
    try {
      const res = await deleteUser({
        userId,
        id: user?._id!,
      });
      responseToast(res, null, "");
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch customers");
    }
    if (data) {
      setCustomers(
        data.users.map((user) => ({
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={user.photo}
              alt={user.name}
            />
          ),
          name: user.name,
          email: user.email,
          gender: user.gender,
          role: user.role,
          action: (
            <button onClick={deleteHandler(user._id)} disabled={loading}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data, isError, error]);

  if (isError || error) return <Navigate to="/admin/dashboard" />;

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>
        {isLoading ? (
          <SkeletonLoader
            height="4rem"
            width="100%"
            flexDir="column"
            padding="1rem"
            margin="4rem 0"
            length={12}
          />
        ) : customers.length === 0 ? (
          <h2 className="noData">No Customers Yet!</h2>
        ) : (
          <CustomerTable data={customers} />
        )}
      </main>
    </div>
  );
};

export default Customer;
