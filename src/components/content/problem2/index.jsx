import { Button, InputNumber, Row, Select, Modal } from "antd";
import "./style.scss";
import { useEffect, useState } from "react";
import DynamicSvg from "./dynamic-svg";
import "../../../assets/tokens/1INCH.svg";
import { ReactComponent as CurrencyLogo } from "../../../assets/currency-convert.svg";

export default function Problem2() {
  const [optionList, setOptionList] = useState([]);
  const [send, setSend] = useState();
  const [receive, setReceive] = useState();
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("USD");
  const [sendPrice, setSendPrice] = useState(1);
  const [receivePrice, setReceivePrice] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const currencyToken = localStorage.getItem("currency");
    if (currencyToken) {
      setOptionList(JSON.parse(currencyToken));
    } else {
      handleCallAPI();
    }
    // eslint-disable-next-line
  }, []);

  const removeDuplicatesByCurrency = (arr) => {
    const uniqueCurrencies = new Set();
    const result = [];

    for (const obj of arr) {
      if (!uniqueCurrencies.has(obj.currency)) {
        uniqueCurrencies.add(obj.currency);
        result.push(obj);
      }
    }

    return result;
  };

  const handleCallAPI = async () => {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const parsedData = await response.json();
    const removedDuplicate = removeDuplicatesByCurrency(parsedData);
    localStorage.setItem("currency", JSON.stringify(removedDuplicate));
    setOptionList(removeDuplicatesByCurrency(removedDuplicate));
  };

  const handleChangeSend = (e) => {
    setSend(e);

    // calculate Receive
    const toUSD = Number(e) * sendPrice;
    const toReceive = toUSD / receivePrice;
    setReceive(toReceive.toFixed(2));
  };

  const handleChangeReceive = (e) => {
    setReceive(e);

    // calculate Send
    const toUSD = Number(e) * receivePrice;
    const toSend = toUSD / sendPrice;
    setSend(toSend.toFixed(2));
  };

  const handleSubmit = () => {
    Modal.success({
      content: "Confirmed successfully",
    });
  };

  const onChangeSendCurrency = (e, item) => {
    setSendCurrency(e);
    const price = item.children.props.item.price;
    setSendPrice(price);

    // calculate Send
    const toUSD = Number(receive) * receivePrice;
    const toSend = toUSD / price;
    setSend(toSend.toFixed(2));
  };

  const onChangeReceiveCurrency = (e, item) => {
    setReceiveCurrency(e);
    const price = item.children.props.item.price;
    setReceivePrice(price);

    // calculate Receive
    const toUSD = Number(send) * sendPrice;
    const toReceive = toUSD / price;
    setReceive(toReceive.toFixed(2));
  };

  const { Option } = Select;

  const SelectSendCurrency = (
    <Select value={sendCurrency} onChange={onChangeSendCurrency} style={{ width: 128 }}>
      {optionList.map((item, index) => (
        <Option key={index} value={item.currency}>
          <DynamicSvg item={item} />
        </Option>
      ))}
    </Select>
  );

  const SelectReceiveCurrency = (
    <Select
      value={receiveCurrency}
      onChange={onChangeReceiveCurrency}
      style={{ width: 128 }}
    >
      {optionList.map((item, index) => (
        <Option key={index} value={item.currency}>
          <DynamicSvg item={item} />
        </Option>
      ))}
    </Select>
  );

  return (
    <div className='problem2'>
      <div className='logo'>
        <CurrencyLogo />
      </div>
      <div className='grid'>
        <div className='grid__item'>
          <label>You Send</label>
          <InputNumber
            placeholder='0'
            value={send}
            onChange={handleChangeSend}
            type='number'
            size='large'
            style={{ width: "100%" }}
            addonAfter={SelectSendCurrency}
          />
        </div>
        <div className='grid__item'>
          <label>You Receive</label>
          <InputNumber
            placeholder='0'
            value={receive}
            onChange={handleChangeReceive}
            type='number'
            size='large'
            style={{ width: "100%" }}
            addonAfter={SelectReceiveCurrency}
          />
        </div>
      </div>
      <Row justify='center'>
        <Button
          size='large'
          type='primary'
          style={{ marginTop: 36 }}
          onClick={handleSubmit}
        >
          Confirm Swap
        </Button>
      </Row>

      <Button className='note' onClick={() => setIsModalOpen(true)}>
        NOTE
      </Button>
      <Modal
        title='Sorry if the logic of the form is wrong.'
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>
          Im not really sure if I understand the task. I sent an email asking, but there
          has been no response yet. Therefore, if I did something wrong, please tell me.
          I'll fix it as soon as possible.
        </p>
        <ul>
          <li>
            I used the URL provided: https://interview.switcheo.com/prices.json for token
            price information and to compute exchange rates.
          </li>
          <li>
            The submit button only show Success notification because there is no API to
            call.
          </li>
        </ul>
      </Modal>
    </div>
  );
}
