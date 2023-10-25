import { useState } from "react";
import { CodeBlock } from "react-code-blocks";
import "./style.scss";
import { Button, InputNumber } from "antd";
import { blockInvalidChar } from "../../../constants";

export default function Problem1() {
  const [maxSafeNumber, setMaxSafeNumber] = useState(100);
  const [myNumber, setMyNumber] = useState(0);
  const [result, setResult] = useState(0);
  const [method, setMethod] = useState(0);

  const sumUsingArithmeticSeries = (n) => {
    const sum = (n * (n + 1)) / 2;
    return sum < maxSafeNumber ? sum : maxSafeNumber;
  };

  const sumUsingForLoop = (n) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum < maxSafeNumber ? sum : maxSafeNumber;
  };

  const sumUsingWhileLoop = (n) => {
    let sum = 0;
    let i = 1;
    while (i <= n && sum <= maxSafeNumber) {
      sum += i;
      i++;
    }
    return sum < maxSafeNumber ? sum : maxSafeNumber;
  };

  const methodsArray = [
    {
      text: `function sumUsingArithmeticSeries(n) {
    const sum = (n * (n + 1)) / 2;
    return sum < MAX_SAFE_INTEGER ? sum : MAX_SAFE_INTEGER;
  }`,
      func: sumUsingArithmeticSeries,
    },
    {
      text: `function sumUsingForLoop(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum < MAX_SAFE_INTEGER ? sum : MAX_SAFE_INTEGER;
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
    return sum < MAX_SAFE_INTEGER ? sum : MAX_SAFE_INTEGER;
  }`,
      func: sumUsingWhileLoop,
    },
  ];

  const handleGetResult = () => {
    setResult(methodsArray[method].func(Number(myNumber)));
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
          type='number'
        />
        <InputNumber
          addonBefore='Enter your number'
          value={myNumber}
          onChange={setMyNumber}
          onKeyDown={blockInvalidChar}
          size='large'
          type='number'
        />
        <Button onClick={handleGetResult} size='large'>
          Calculate
        </Button>
        <p style={{ textAlign: "center" }}>Result is: {result}</p>
      </div>
    </div>
  );
}
