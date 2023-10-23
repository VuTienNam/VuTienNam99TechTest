import Problem1 from "./problem1";
import "./style.css";

export default function Content({ chosenProblem }) {
  return (
    <div className='content'>
      <div className='box'>
        <div className='solution'>{chosenProblem === 1 ? <Problem1 /> : ""}</div>
      </div>
    </div>
  );
}
