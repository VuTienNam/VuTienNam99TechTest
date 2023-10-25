import { Button, Col, InputNumber, Row, Select, Space } from "antd";
import "./style.scss";
import { useEffect, useState } from "react";
import DynamicSvg from "./dynamic-svg";
import "../../../assets/tokens/1INCH.svg";

export default function Problem2() {
  const [send, setSend] = useState();
  const [receive, setReceive] = useState();
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const currencyToken = localStorage.getItem("currency");
    if (currencyToken) {
      handleAddImageToSelect(JSON.parse(currencyToken));
    } else {
      handleCallAPI();
    }
    // eslint-disable-next-line
  }, []);

  const handleChangeCurrency = (e) => {
    setCurrency(e);
    setReceive((Number(send) * price).toFixed(2));
  };

  const handleAddImageToSelect = (array) => {
    const dataForSelectComponent = array.map((item, index) => {
      return {
        ...item,
        value: `${item.currency}--${index}`,
        label: <DynamicSvg item={item} setPrice={setPrice} />,
      };
    });
    setData(dataForSelectComponent);
  };

  const handleCallAPI = async () => {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const parsedData = await response.json();
    localStorage.setItem("currency", JSON.stringify(parsedData));
    handleAddImageToSelect(parsedData);
  };

  const handleChangeSend = (e) => {
    setSend(e);
    setReceive((Number(e) * price).toFixed(2));
  };

  const handleChangeReceive = (e) => {
    setReceive(e);
    setSend((Number(e) / price).toFixed(2));
  };

  return (
    <div className='problem2'>
      <Space direction='vertical' style={{ width: "100%" }}>
        <label>Choose currency</label>
        <Select
          showSearch
          size='large'
          options={data}
          placeholder='Select currency'
          value={currency}
          onChange={handleChangeCurrency}
          style={{ width: "100%" }}
        />
      </Space>

      <Row gutter={16} style={{ marginTop: 36 }}>
        <Col>
          <Space direction='vertical'>
            <label>You Send</label>
            <InputNumber
              placeholder='0'
              value={send}
              onChange={handleChangeSend}
              type='number'
              size='large'
              style={{ width: "100%" }}
              disabled={currency === null}
            />
          </Space>
        </Col>
        <Col>
          <Space direction='vertical'>
            <label>You Get</label>
            <InputNumber
              placeholder='0'
              value={receive}
              onChange={handleChangeReceive}
              type='number'
              size='large'
              style={{ width: "100%" }}
              disabled={currency === null}
            />
          </Space>
        </Col>
      </Row>
      <Row justify='center'>
        <Button size='large' type='primary' style={{ marginTop: 36 }}>
          Confirm Swap
        </Button>
      </Row>
    </div>
  );
}
