import "./Quiz.css";

const Timer = ({ timer }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Quiz Application</h2>
      <div className="bg-blue-200 flex gap-2 p-2 items-center rounded-lg">
        <p className="text-base font-normal text-blue-800">Time Left</p>
        <p className="text-lg bg-gray-600 px-2 text-slate-200 rounded-md font-semibold">
          {timer}
        </p>
      </div>
    </div>
  );
};

export default Timer;
