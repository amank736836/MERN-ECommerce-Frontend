import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  amount?: boolean;
  color: string;
}

const WidgetItem = ({
  heading,
  value,
  percent = 0,
  amount = false,
  color,
}: WidgetItemProps) => {
  percent = percent > 0 && percent > 10000 ? 9999 : percent;
  percent = percent < 0 && percent < -10000 ? -9999 : percent;

  return (
    <article className="widget">
      <div className="widgetInfo">
        <p>{heading}</p>
        <h4>{amount ? `₹${value}` : value}</h4>
        {percent > 0 ? (
          <span className="green">
            <HiTrendingUp /> +{percent}%{" "}
          </span>
        ) : (
          <span className="red">
            <HiTrendingDown /> {percent}%{" "}
          </span>
        )}
      </div>

      <div
        className="widgetCircle"
        style={{
          background: `conic-gradient(
          ${color}
          ${(Math.abs(percent) / 100) * 360}deg,
          rgb(255 , 255, 255) 0
          `,
        }}
      >
        <span
          style={{
            color: color,
          }}
        >
          {percent}
        </span>
      </div>
    </article>
  );
};

export default WidgetItem;
