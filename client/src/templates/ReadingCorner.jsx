import CurrentReading from "./CurrentReading";
import GoalUpdate from "./GoalUpdate";
import Header from "./Header";
import ReadingHistory from "./ReadingHistory";
import "./ReadingCorner.css";

const ReadingCorner = () => {
  return (
    <>
      <Header />

      <div className="top-section">
        <CurrentReading />
        <GoalUpdate />
      </div>

      <div className="bottom-section">
        <ReadingHistory />
      </div>
    </>
  );
};

export default ReadingCorner;
