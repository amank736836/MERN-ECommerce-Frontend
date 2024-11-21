import { useRating } from "6pp";
import { FaRegStar, FaStar } from "react-icons/fa6";

const Ratings = ({ value = 0 }: { value: number }) => {
  const { Ratings } = useRating({
    IconFilled: <FaStar />,
    IconOutline: <FaRegStar />,
    value,
    styles: {
      fontSize: "1.75rem",
      color: "coral",
      // gap: "0.5rem",
      justifyContent: "flex-start",
    },
  });
  return <Ratings />;
};

export default Ratings;
