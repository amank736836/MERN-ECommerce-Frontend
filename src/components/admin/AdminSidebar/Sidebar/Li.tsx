import { Link } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { Location } from "react-router-dom";

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}

const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? "rgba(0,115,255,0.1)"
        : "white",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgba(0,115,255,1)" : "black",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default Li;
