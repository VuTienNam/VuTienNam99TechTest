import { useState } from "react";
import { CodeBlock } from "react-code-blocks";
import "./style.css";
import { Button, InputNumber } from "antd";

export default function Problem1() {
  const [maxSafeNumber, setMaxSafeNumber] = useState(100);
  const [myNumber, setMyNumber] = useState(0);
  const [result, setResult] = useState(0);
  const [method, setMethod] = useState(0);

  const blockInvalidChar = (e) => {
    return ["e", "E", "+", "-", ".", ","].includes(e.key) && e.preventDefault();
  };

  const sumUsingArithmeticSeries = (n) => {
    return (n * (n + 1)) / 2;
  };

  const sumUsingForLoop = (n) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };

  const sumUsingWhileLoop = (n) => {
    let sum = 0;
    let i = 1;
    while (i <= n && sum <= maxSafeNumber) {
      sum += i;
      i++;
    }
    return sum;
  };

  const methodsArray = [
    {
      text: `function sumUsingArithmeticSeries(n) {
            return (n * (n + 1)) / 2;
          }`,
      func: sumUsingArithmeticSeries,
    },
    {
      text: `function sumUsingForLoop(n) {
            let sum = 0;
            for (let i = 1; i <= n; i++) {
              sum += i;
            }
            return sum;
          }`,
      func: sumUsingForLoop,
    },
    {
      text: `function sumUsingWhileLoop(n) {
        let sum = 0;
        let i = 1;
        while (i <= n) {
          sum += i;
          i++;
        }
        return sum;
      }`,
      func: sumUsingWhileLoop,
    },
  ];

  const handleGetResult = () => {
    const sum = methodsArray[method].func(Number(myNumber));
    setResult(sum > maxSafeNumber ? maxSafeNumber : sum);
  };

  return (
    <div className='problem1'>
      <p>Choose method</p>
      <div className='choose-method'>
        {methodsArray.map((item, index) => (
          <div
            key={index}
            className={`method-${index} ${method === index && "method--active"}`}
            onClick={() => setMethod(index)}
          >
            <CodeBlock text={item.text} language='js' showLineNumbers={false} wrapLines />
          </div>
        ))}
      </div>
      <div className='form'>
        <InputNumber
          addonBefore='Max safe number'
          value={maxSafeNumber}
          onChange={setMaxSafeNumber}
          onKeyDown={blockInvalidChar}
          size='large'
        />
        <InputNumber
          addonBefore='Enter your number'
          value={myNumber}
          onChange={setMyNumber}
          onKeyDown={blockInvalidChar}
          size='large'
        />
        <Button onClick={handleGetResult} size='large'>
          Calculate
        </Button>
        <p style={{ textAlign: "center" }}>Result is: {result}</p>
      </div>
    </div>
  );
}
