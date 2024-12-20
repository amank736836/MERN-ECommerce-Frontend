import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { AppItems } from "./Items/AppsItems";
import { ChartItems } from "./Items/ChartsItems";
import { DashboardItems } from "./Items/DashboardItems";

import { RiMenuFold4Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { AppSidebar } from "./Sidebar/AppSidebar";
import { ChartSidebar } from "./Sidebar/ChartSidebar";
import { DashboardSidebar } from "./Sidebar/DashboardSidebar";

const AdminSidebar = () => {
  const location = useLocation();

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
          onClick={() => setShowModal(!showModal)}
        >
          {showModal ? <RiMenuUnfold4Fill /> : <RiMenuFold4Fill />}
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
        <Link to="/" className="logo">
          <h2>Logo.</h2>
        </Link>
        <DashboardSidebar
          dashboard={DashboardItems}
          location={location}
          setShowModal={setShowModal}
        />
        <ChartSidebar
          charts={ChartItems}
          location={location}
          setShowModal={setShowModal}
        />
        <AppSidebar
          apps={AppItems}
          location={location}
          setShowModal={setShowModal}
        />

        {phoneActive && (
          <button className="closeSidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

export default AdminSidebar;
