import Problem1 from "./problem1";
import Problem2 from "./problem2";
import Problem3 from "./problem3";
import "./style.scss";

export default function Content({ chosenProblem }) {
  return (
    <div className='content'>
      <div className='box'>
        {chosenProblem === 1 ? (
          <Problem1 />
        ) : chosenProblem === 2 ? (
          <Problem2 />
        ) : (
          <Problem3 />
        )}
      </div>
    </div>
  );
}
