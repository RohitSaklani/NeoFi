import { useEffect, useState, useRef } from "react";
import "../styles/tradecard.css";
import CurrencyList from "./CurrencyList";
import { initial } from "../Constant";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default function TradeCard() {
  let tempprice = 0;

  const [inputAmount, setInputAmount] = useState();
  const [estimAmount, setEstimAmout] = useState();
  const [showList, setShowList] = useState(false);
  const [currencyList, setCurrencyList] = useState(initial);

  const [selectedCurr, setSelectedCurr] = useState(initial[0]);
  const price = useRef(null);

  useEffect(() => {
    setInputAmount("");
    setEstimAmout("");

    const client = new W3CWebSocket(
      "wss://stream.binance.com:9443/ws/" + selectedCurr.symbol + "usdt@trade"
    );
    client.onmessage = (event) => {
      tempprice = Math.trunc(JSON.parse(event.data).p * 80);
    };
    const interval = setInterval(() => {
      if (price.current) price.current.innerText = tempprice;
    }, 1000);

    return () => {
      client.close();
      clearInterval(interval);
    };
  }, [selectedCurr]);

  function calculateEstim(e) {
    let val = e.target.value / price.current.innerText;
    setEstimAmout(val);

    setInputAmount(e.target.value);
  }

  function showCurrencyList() {
    return (
      <CurrencyList
        value={{ currencyList, selectedCurr, setSelectedCurr, setShowList }}
      />
    );
  }

  return (
    <div className="trade-card-container">
      <div className="trade-card">
        <div className="header-img-container">
          <div className="header-img-out-br">
            <div className="header-img-inner">
              <div className="header-img">
                <img src={selectedCurr?.image}></img>
              </div>
            </div>
          </div>
        </div>
        {showList ? showCurrencyList() : null}
        <div className="price">
          <p>Current value</p>
          <span>
            &#8377;<span ref={price}></span>
          </span>
        </div>
        <button className="select-btn" onClick={() => setShowList(true)}>
          <p>
            <img src={selectedCurr?.image} alt="img"></img>
            {selectedCurr?.name}
          </p>
          <span>
            <img src="/assets/down.png" />
          </span>
        </button>
        <div>
          <span>Amount yout want to invest</span>
        </div>
        <div className="input-val">
          <input
            type="number"
            value={inputAmount}
            onChange={calculateEstim}
            placeholder="0.00"
          ></input>
          <span>INR</span>
        </div>
        <div>
          <span>Estimate Number you will get</span>
        </div>
        <div className="estim-val">
          <input
            type="number"
            value={estimAmount}
            placeholder="0.00"
            readOnly
          ></input>
        </div>
        <button className="buy-btn">Buy</button>
      </div>
    </div>
  );
}
