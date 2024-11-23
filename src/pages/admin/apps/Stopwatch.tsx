import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = String(hours).padStart(2, "0");
  const minutesInString = String(minutes).padStart(2, "0");
  const secondsInString = String(seconds).padStart(2, "0");

  return hoursInString + ": " + minutesInString + ": " + secondsInString;
};
const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboardAppContainer">
        <h1>Stopwatch</h1>
        <section>
          <div className="stopwatch">
            <h2>{formatTime(time)}</h2>
            <button
              onClick={() => setIsRunning((prevIsRunning) => !prevIsRunning)}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={() => resetHandler()}>Reset</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;
