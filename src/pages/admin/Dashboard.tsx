import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts/Charts";

import userImg from "../assets/images/userPic.png";
import {
  categories as categoryItems,
  transactions as transactionItems,
  widgets as widgetItems,
} from "../../assets/data.json";

import WidgetItem from "../../components/admin/DashboardItems/WidgetItem";
import CategoryItem from "../../components/admin/DashboardItems/CategoryItem";
import Table from "../../components/admin/Tables/DashboardTable";

import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";

const Dashboard = () => {
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs etc." />
          <FaRegBell />
          <img src={userImg} alt="User" />
        </div>
        <section className="widgetContainer">
          {widgetItems.map((item, index) => (
            <WidgetItem
              key={index}
              heading={item.heading}
              value={item.value}
              percent={item.percent}
              amount={item.amount}
              color={item.color}
            />
          ))}
        </section>

        <section className="graphContainer">
          <div className="revenueChart">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>
          <div className="dashboardCategories">
            <h2>Inventory</h2>
            <div>
              {categoryItems.map((item, index) => (
                <CategoryItem
                  key={index}
                  heading={item.heading}
                  value={item.value}
                  color={`hsl(
                    ${item.value * 4}
                    ,${item.value}%
                    ,50%
                    )`}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="transactionContainer">
          <div className="genderChart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div>

          <Table data={transactionItems} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
