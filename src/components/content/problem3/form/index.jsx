import { CodeBlock } from "react-code-blocks";
import "./style.scss";

export default function FormProblem3({ before, after, explain, index }) {
  return (
    <div className='form-problem3'>
      <label>Issue #{index + 1}</label>
      <div className='code-block'>
        <div>
          <span className='title'>BEFORE</span>
          <CodeBlock text={before} language='ts' showLineNumbers={false} wrapLines />
        </div>
        <div>
          <span className='title'>AFTER</span>
          <CodeBlock text={after} language='ts' showLineNumbers={false} wrapLines />
        </div>
      </div>
      <div className='explain'>
        <span className='title'>EXPLAIN</span>
        <div dangerouslySetInnerHTML={{ __html: explain }} />
      </div>
    </div>
  );
}
