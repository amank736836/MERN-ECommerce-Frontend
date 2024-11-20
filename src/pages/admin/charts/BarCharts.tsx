import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts/Charts";
import { SkeletonLoader } from "../../../components/loader";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { getLastMonths } from "../../../utils/features";
import { useEffect } from "react";

const { last6Months, last12Months } = getLastMonths();

const BarCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useBarQuery(user?._id!);

  const Products = data?.charts.products || [];
  const Users = data?.charts.users || [];
  const Orders = data?.charts.orders || [];

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch bar charts data");
    }
  }, [isError, error]);

  if (isError || error) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Bar Charts</h1>
        {isLoading ? (
          <SkeletonLoader
            height="8rem"
            width="100%"
            flexDir="column"
            padding="1rem"
            margin="4rem 0"
            length={12}
          />
        ) : (
          <>
            <section>
              <BarChart
                data_1={Products}
                data_2={Users}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
                labels={last6Months}
              />
              <h2>Top Selling Products & Top Customers</h2>
            </section>
            <section>
              <BarChart
                data_1={Orders}
                data_2={[]}
                title_1="Products"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Months}
                horizontal={true}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default BarCharts;
