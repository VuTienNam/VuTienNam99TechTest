import React, { Suspense, useEffect, useState } from "react";
import "./style.scss";

const DynamicSvg = ({ item, setPrice }) => {
  const [SvgComponent, setSvgComponent] = useState(null);

  const importSvg = async (name) => {
    return import(`../../../../assets/tokens/${name}.svg`)
      .then((module) => module.default)
      .catch((error) => {
        return null;
      });
  };

  useEffect(() => {
    importSvg(item.currency).then((component) => {
      setSvgComponent(component);
    });
  }, [item]);

  return (
    <span className='logo-and-name' onClick={() => setPrice(item.price)}>
      {item.currency}
      <span>{item.date}</span>
      <Suspense fallback={<></>}>
        <img src={SvgComponent} alt='' />
      </Suspense>
    </span>
  );
};

export default DynamicSvg;
