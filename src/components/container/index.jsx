import { useState } from "react";
import Content from "../content";
import Sidebar from "../sidebar";

export default function Container() {
  const [chosenProblem, setChosenProblem] = useState(1);

  return (
    <div className='container'>
      <Sidebar chosenProblem={chosenProblem} setChosenProblem={setChosenProblem} />
      <Content chosenProblem={chosenProblem} />
    </div>
  );
}
