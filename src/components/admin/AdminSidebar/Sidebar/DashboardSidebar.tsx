import { Location } from "react-router-dom";
import Li from "./Li";
import { IconType } from "react-icons";

export const DashboardSidebar = ({
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
