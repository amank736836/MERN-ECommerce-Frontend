import { IconType } from "react-icons";
import Li from "./Li";
import { Location } from "react-router-dom";

export const AppSidebar = ({
  apps,
  location,
  setShowModal,
}: {
  apps: { name: string; icon: IconType; url: string }[];
  location: Location;
  setShowModal: (value: boolean) => void;
}) => {
  return (
    <div>
      <h5>Apps</h5>
      <ul onClick={() => setShowModal(false)}>
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
