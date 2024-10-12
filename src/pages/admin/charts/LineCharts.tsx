import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts/Charts";
import { SkeletonLoader } from "../../../components/loader";
import { useLineQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { getLastMonths } from "../../../utils/features";

const { last12Months: months } = getLastMonths();

const LineCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useLineQuery(user?._id!);

  const Users = data?.charts.users || [];
  const Products = data?.charts.products || [];
  const Revenue = data?.charts.revenue || [];
  const Discount = data?.charts.discount || [];

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  }, [isError]);

  if (isError) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Line Charts</h1>
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
              <LineChart
                data={Users}
                label="Users"
                backgroundColor={`rgb(53, 162, 255,0.5)`}
                borderColor={`rgb(53, 162, 255)`}
                labels={months}
              />
              <h2>Active Users</h2>
            </section>
            <section>
              <LineChart
                data={Products}
                label="Products"
                backgroundColor={`hsla(269, 80%, 40%,0.4)`}
                borderColor={`hsla(269, 80%, 40%)`}
                labels={months}
              />
              <h2>Total Products (SKU)</h2>
            </section>

            <section>
              <LineChart
                data={Revenue}
                label="Revenue"
                backgroundColor={`hsla(129, 80%, 40%,0.4)`}
                borderColor={`hsla(129, 80%, 40%)`}
                labels={months}
              />
              <h2>Total Revenue</h2>
            </section>

            <section>
              <LineChart
                data={Discount}
                label="Discount"
                backgroundColor={`hsla(29, 80%, 40%,0.4)`}
                borderColor={`hsla(29, 80%, 40%)`}
                labels={months}
              />
              <h2>Discount Allotted</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default LineCharts;
