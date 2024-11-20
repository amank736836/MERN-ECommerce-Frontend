import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts/Charts";

import {
  stats as statsData,
  widgets as widgetItems,
} from "../../assets/defaultData.json";

import CategoryItem from "../../components/admin/DashboardItems/CategoryItem";
import WidgetItem from "../../components/admin/DashboardItems/WidgetItem";
import DashboardTable from "../../components/admin/Tables/DashboardTable";

import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SkeletonLoader } from "../../components/loader";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { Stats } from "../../types/types";
import { getLastMonths } from "../../utils/features";
import { useEffect } from "react";

const { last6Months } = getLastMonths();

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useStatsQuery(user?._id!);

  const stats = (data?.stats as Stats) || statsData;

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch dashboard data");
    }
  }, [isError, error]);

  if (isError || error) {
    return <Navigate to="/" />;
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs etc." />
          {/* <FaRegBell /> */}
        </div>
        {isLoading ? (
          <SkeletonLoader
            height="4rem"
            width="100%"
            flexDir="column"
            padding="1rem"
            margin="4rem 0"
            length={12}
          />
        ) : (
          <>
            <section className="widgetContainer">
              {widgetItems.map((item, index) => (
                <WidgetItem
                  key={index}
                  heading={item.heading}
                  value={
                    stats.count[
                      item.heading.toLowerCase() as keyof typeof stats.count
                    ]
                  }
                  percent={
                    stats.ChangePercent[
                      item.heading.toLowerCase() as keyof typeof stats.ChangePercent
                    ]
                  }
                  amount={item.amount}
                  color={item.color}
                />
              ))}
            </section>
            <section className="graphContainer">
              <div className="revenueChart">
                <h2>Revenue & Orders</h2>
                <BarChart
                  data_1={stats.chart.revenue}
                  data_2={stats.chart.order}
                  title_1="Revenue"
                  title_2="Orders"
                  bgColor_1="rgb(0,115,255)"
                  bgColor_2="rgba(53,162,235,0.8)"
                  labels={last6Months}
                />
              </div>
              <div className="dashboardCategories">
                <h2>Inventory</h2>
                <div>
                  {stats.categoryCount.map((item, index) => {
                    const [heading, value] = Object.entries(item)[0];
                    return (
                      <CategoryItem
                        key={index}
                        heading={heading}
                        value={value}
                        color={`hsl(
                    ${value * Math.floor(Math.random() * 5 + 4)}
                    ,${value}%
                    ,50%
                    )`}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
            <section className="orderContainer">
              <div className="genderChart">
                <h2>Gender Ratio</h2>
                <DoughnutChart
                  labels={["Female", "Male"]}
                  data={[stats.userRatio.female, stats.userRatio.male]}
                  backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                  cutout={90}
                />
                <p>
                  <BiMaleFemale />
                </p>
              </div>

              <DashboardTable data={stats.latestOrders} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
