import { useState } from "react";
import "../styles/currencylist.css";

export default function CurrencyList({ value }) {
  const { currencyList, selectedCurr, setSelectedCurr, setShowList } = value;

  const [searchedList, setSearchedList] = useState(currencyList);

  function handleSearch(s) {
    let temp = currencyList.filter(
      (ele) => ele.name.search(s) >= 0 || ele.name.toLowerCase().search(s) >= 0
    );

    setSearchedList(temp);
  }

  return (
    <div className="overlay">
      <div className="list-card">
        <button className="cancel-btn" onClick={() => setShowList(false)}>
          <img src="/assets/cross.png" alt="asdf"></img>
        </button>
        <div className="search">
          <img src="/assets/search.png" alt="asdf" />
          <input onChange={(e) => handleSearch(e.target.value)}></input>
        </div>
        <ul className="curr-list">
          {searchedList?.map((ele) => (
            <li
              onClick={() => {
                setSelectedCurr(ele);
                setShowList(false);
              }}
            >
              <img src={ele.image} alt="asdf"></img>
              <p>{ele.name}</p>
              {ele.id === selectedCurr.id ? <span>&#10003;</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
