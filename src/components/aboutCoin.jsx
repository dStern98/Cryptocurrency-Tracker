import React, { useEffect, useState } from "react";
import axiosInstance from "../apis/axiosAPI";

const AboutCoin = ({ coin }) => {
  const [coinAbout, setCoinAbout] = useState({});

  useEffect(() => {
    const fetchCoinAbout = async () => {
      try {
        const response = await axiosInstance.get(`/coins/${coin}`, {
          params: {
            tickers: false,
            localization: false,
          },
        });
        setCoinAbout(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoinAbout();
  }, [coin]);

  const renderAbout = () => {
    if (Object.keys(coinAbout).length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div
        className="d-flex flex-row justify-content-around align-items-around mt-2 py-2 mb-2
                            shadow-sm bg-white"
      >
        <div className="d-flex flex-column justify-content-between align-items-center">
          <span className="fs-6">Icon</span>
          <img src={coinAbout?.image?.small} alt="CoinIcon" />
        </div>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <span className="fs-6">Symbol</span>
          <span className="fs-3">{coinAbout?.symbol || "-"}</span>
        </div>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <span className="fs-6">Name</span>
          <span className="fs-3">{coinAbout?.name || "-"}</span>
        </div>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <span className="fs-6">Block Time in Minutes</span>
          <span className="fs-3">
            {coinAbout?.block_time_in_minutes || "-"}
          </span>
        </div>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <span className="fs-6">Genesis Date</span>
          <span className="fs-3">{coinAbout?.genesis_date || "-"}</span>
        </div>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <span className="fs-6">Hashing Algorithm</span>
          <span className="fs-3">{coinAbout?.hashing_algorithm || "-"}</span>
        </div>
      </div>
    );
  };

  return <>{renderAbout()}</>;
};

export default AboutCoin;
