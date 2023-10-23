import "./style.scss";

const problemTabs = [
  {
    id: 1,
    name: "Problem 1",
  },
  {
    id: 2,
    name: "Problem 2",
  },
  {
    id: 3,
    name: "Problem 3",
  },
];

export default function Sidebar({ chosenProblem, setChosenProblem }) {
  return (
    <div className='sidebar'>
      {problemTabs.map((item) => (
        <div
          key={item.id}
          className={`item ${chosenProblem === item.id && "active"}`}
          onClick={() => setChosenProblem(item.id)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
