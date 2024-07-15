import { IconType } from "react-icons";
import Li from "./Li";
import { Location } from "react-router-dom";

export const ChartSidebar = ({
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
