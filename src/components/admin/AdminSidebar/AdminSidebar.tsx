import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon3Fill,
  RiDatabaseFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Location, useLocation } from "react-router-dom";
import Li from "./Li";

const AdminSidebar = () => {
  const location = useLocation();

  const dashboard = [
    {
      name: "Dashboard",
      icon: RiDatabaseFill,
      url: "/admin/dashboard",
    },
    {
      name: "Product",
      icon: RiShoppingBag3Fill,
      url: "/admin/product",
    },
    {
      name: "Customer",
      icon: IoIosPeople,
      url: "/admin/customer",
    },
    {
      name: "Transaction",
      icon: AiFillFileText,
      url: "/admin/transaction",
    },
  ];

  const charts = [
    {
      name: "Bar Chart",
      icon: FaChartBar,
      url: "/admin/chart/bar",
    },
    {
      name: "Pie Chart",
      icon: FaChartPie,
      url: "/admin/chart/pie",
    },
    {
      name: "Line Chart",
      icon: FaChartLine,
      url: "/admin/chart/line",
    },
  ];

  const apps = [
    {
      name: "Stopwatch",
      icon: FaStopwatch,
      url: "/admin/app/stopwatch",
    },
    {
      name: "Coupon",
      icon: RiCoupon3Fill,
      url: "/admin/app/coupon",
    },
    {
      name: "Toss",
      icon: FaGamepad,
      url: "/admin/app/toss",
    },
  ];

  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [setPhoneActive]);

  return (
    <>
      {phoneActive && (
        <button
          type="button"
          className="hamburger"
          onClick={() => setShowModal(true)}
        >
          <HiMenuAlt4 />
        </button>
      )}

      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: "0",
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <h2>Logo.</h2>
        <Dashboard dashboard={dashboard} location={location} />
        <Chart charts={charts} location={location} />
        <Apps apps={apps} location={location} />

        {phoneActive && (
          <button className="closeSidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

const Dashboard = ({
  dashboard,
  location,
}: {
  dashboard: { name: string; icon: IconType; url: string }[];
  location: Location;
}) => {
  return (
    <div>
      <h5>Dashboard</h5>
      <ul>
        {dashboard.map((item, index) => (
          <Li
            key={index}
            url={item.url}
            text={item.name}
            location={location}
            Icon={item.icon}
          />
        ))}
      </ul>
    </div>
  );
};

const Chart = ({
  charts,
  location,
}: {
  charts: { name: string; icon: IconType; url: string }[];
  location: Location;
}) => {
  return (
    <div>
      <h5>Charts</h5>
      <ul>
        {charts.map((item, index) => (
          <Li
            key={index}
            url={item.url}
            text={item.name}
            location={location}
            Icon={item.icon}
          />
        ))}
      </ul>
    </div>
  );
};

const Apps = ({
  apps,
  location,
}: {
  apps: { name: string; icon: IconType; url: string }[];
  location: Location;
}) => {
  return (
    <div>
      <h5>Apps</h5>
      <ul>
        {apps.map((item, index) => (
          <Li
            key={index}
            url={item.url}
            text={item.name}
            location={location}
            Icon={item.icon}
          />
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
