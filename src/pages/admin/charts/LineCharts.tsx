import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts/Charts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LineCharts = () => {
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Line Charts</h1>
        <section>
          <LineChart
            data={[
              200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
            ]}
            label="Users"
            backgroundColor={`rgb(53, 162, 255,0.5)`}
            borderColor={`rgb(53, 162, 255)`}
            labels={months}
          />
          <h2>Active Users</h2>
        </section>
        <section>
          <LineChart
            data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32]}
            label="Products"
            backgroundColor={`hsla(269, 80%, 40%,0.4)`}
            borderColor={`hsla(269, 80%, 40%)`}
            labels={months}
          />
          <h2>Total Products (SKU)</h2>
        </section>

        <section>
          <LineChart
            data={[
              24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000,
              144400, 100000, 120000,
            ]}
            label="Revenue"
            backgroundColor={`hsla(129, 80%, 40%,0.4)`}
            borderColor={`hsla(129, 80%, 40%)`}
            labels={months}
          />
          <h2>Total Revenue</h2>
        </section>

        <section>
          <LineChart
            data={[
              9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500,
              2000, 1500,
            ]}
            label="Discount"
            backgroundColor={`hsla(29, 80%, 40%,0.4)`}
            borderColor={`hsla(29, 80%, 40%)`}
            labels={months}
          />
          <h2>Discount Allotted</h2>
        </section>
      </main>
    </div>
  );
};

export default LineCharts;
