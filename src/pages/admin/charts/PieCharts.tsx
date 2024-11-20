import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { pieChart as Chart } from "../../../assets/defaultData.json";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import {
  DoughnutChart,
  PieChart,
} from "../../../components/admin/Charts/Charts";
import { SkeletonLoader } from "../../../components/loader";
import { usePieQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { Pie } from "../../../types/types";
import { useEffect } from "react";
const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = usePieQuery(user?._id!);

  let pie = (data?.charts as Pie) || Chart;

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch pie charts data");
    }
  }, [isError, error]);

  if (isError || error) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Pie & Doughnut Charts</h1>
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
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[
                    data ? pie.orderFullfiillment.processing : 0,
                    pie.orderFullfiillment.shipped,
                    pie.orderFullfiillment.delivered,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,80%)",
                    "hsl(110,80%,50%)",
                    "hsl(110,40%,50%)",
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={pie.productCategories.map(
                    (category) => Object.keys(category)[0]
                  )}
                  data={pie.productCategories.map(
                    (category) => Object.values(category)[0]
                  )}
                  backgroundColor={pie.productCategories.map((category) => {
                    const categoryValue = Object.values(category)[0];

                    return `hsl(${
                      categoryValue * Math.floor(Math.random() * 5 + 4)
                    },${categoryValue}%,50%)`;
                  })}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Products Categories Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out of Stock"]}
                  data={[
                    pie.stockAvailability.inStock,
                    pie.stockAvailability.outOfStock,
                  ]}
                  backgroundColor={["hsl(269, 80%, 40%)", "rgb(53,162,255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2>Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    pie.revenueDistribution.marketingCost,
                    pie.revenueDistribution.discount,
                    pie.revenueDistribution.burnt,
                    pie.revenueDistribution.productionCost,
                    pie.revenueDistribution.netMargin,
                  ]}
                  backgroundColor={[
                    "hsl(110, 80%, 40%)",
                    "hsl(19, 80%, 40%)",
                    "hsl(69, 80%, 40%)",
                    "hsl(300, 80%, 40%)",
                    "rgb(53,162,255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager (Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[
                    pie.userAgeGroup.teen,
                    pie.userAgeGroup.adult,
                    pie.userAgeGroup.senior,
                  ]}
                  backgroundColor={[
                    "hsl(10,80%,80%)",
                    "hsl(10,80%,50%)",
                    "hsl(10,40%,50%)",
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[pie.adminCustomer.admin, pie.adminCustomer.user]}
                  backgroundColor={["hsl(335, 100%, 38%)", "hsl(44,98%,50%)"]}
                  offset={[0, 80]}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
