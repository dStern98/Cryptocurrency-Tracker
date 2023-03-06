import React from "react";
import { Link } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";

const ListElement = ({ coin_data, deleteCoin, currency }) => {
  const { symbol, id, image, price_change_percentage_24h, current_price } =
    coin_data;

  return (
    <Link to={`/${id}`} className="text-decoration-none">
      <div className="card m-3 list-element coin-card shadow-sm fs-3 text-dark">
        <div className="row m-1">
          <div className="col m-1">
            <img src={image} alt="Coin Symbol" className="coin-list-image" />
          </div>
          <div className="d-flex flex-column col m-1">
            <span className="fs-4">{symbol?.toUpperCase()}</span>
            <span className="fs-6">{id}</span>
          </div>
        </div>

        <div className="row m-1">
          <div className="col fs-3 m-1 d-flex flex-column">
            <span className="fs-6">Current Price</span>
            <span className="fs-3">
              {currency.symbol}
              {current_price
                ?.toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
          <div className={"d-flex flex-column col m-1"}>
            <span className="fs-6">24hr Change %</span>
            <span
              className={`${
                price_change_percentage_24h > 0 ? "text-success" : "text-danger"
              }`}
            >
              {price_change_percentage_24h > 0 ? "+" : ""}
              {price_change_percentage_24h?.toFixed(2)}%
            </span>
            <span
              className="text-danger mx-2 delete-icon"
              onClick={(e) => {
                e.preventDefault();
                deleteCoin(coin_data.id);
              }}
            >
              <BsFillXCircleFill size={21} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListElement;
