import React, {useEffect, useState} from "react";
import axiosInstance from "../apis/axiosAPI";

const CoinMetrics = ({coin, currency}) => {
    const [coinData, setCoinData] = useState({});

    useEffect(()=> {
        const fetchCoinMetrics = async () => {
            try {
                const response = await axiosInstance.get("/coins/markets", {
                    params: {
                        vs_currency: currency.vs_currency,
                        ids: coin
                    }
                })
                setCoinData(response.data[0]);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchCoinMetrics();
    }, [currency, coin])


    const prettifyNumbers = (metric, metric_name = null)=> {
        if (metric) {
            try {
                if (["current_price", "high_24h", "low_24h", "price_change_24h"].find((name) => name === metric_name)) {
                    return metric.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                else if (["price_change_percentage_24h"].find((name) => name === metric_name)) {
                    return metric.toFixed(2);
                }
                return metric.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            catch (error) {
                return "-";
            }
        }
        else {
            return "-"
        }
    }

    const renderMetrics = () => {
        if (Object.keys(coinData).length===0) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div className="d-flex flex-row justify-content-around align-items-center mt-2 mb-5 pb-1
                            shadow-sm bg-white">
                <div className="d-flex flex-column justify-content-around align-items-center">
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="mx-1 my-1 fs-6">Current Price</span>
                        <span className="mx-1 my-1 fs-3">{currency?.symbol}{prettifyNumbers(coinData?.current_price,"current_price")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="mx-1 my-1 fs-6">High 24h</span>
                        <span className="mx-1 my-1 fs-3">{currency?.symbol}{prettifyNumbers(coinData?.high_24h, "high_24h")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="mx-1 my-1 fs-6">Low 24h</span>
                        <span className="mx-1 my-1 fs-3">{currency?.symbol}{prettifyNumbers(coinData?.low_24h, "low_24h")}</span>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-around align-items-center">
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="mx-1 my-1 fs-6">Market Cap</span>
                        <span className="mx-1 my-1 fs-3">{prettifyNumbers(coinData?.market_cap, "market_cap")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="mx-1 my-1 fs-6">Market Cap Rank</span>
                        <span className="mx-1 my-1 fs-3">{prettifyNumbers(coinData?.market_cap_rank, "market_cap_rank")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="mx-1 my-1 fs-6">Total Volume</span>
                        <span className="mx-1 my-1 fs-3">{prettifyNumbers(coinData?.total_volume, "total_volume")}</span>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-around align-items-center">
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="mx-1 my-1 fs-6">Price Change 24h</span>
                        <span className={`mx-1 my-1 fs-3 
                        ${coinData.price_change_24h>0? "text-success": "text-danger" }`}>
                            {currency.symbol}{prettifyNumbers(coinData?.price_change_24h, "price_change_24h")}
                        </span>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="mx-1 my-1 fs-6">Price Change 24h %</span>
                        <span className={`mx-1 my-1 fs-3 
                        ${coinData?.price_change_percentage_24h>0? "text-success": "text-danger" }`}>
                            {coinData?.price_change_percentage_24h>0? "+": ""}
                            {prettifyNumbers(coinData?.price_change_percentage_24h, "price_change_percentage_24h")}%
                        </span>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="mx-1 my-1 fs-6">Total Supply</span>
                        <span className="mx-1 my-1 fs-3">{prettifyNumbers(coinData?.total_supply, "total_supply")}</span>
                    </div>
                </div>
        </div>
        )
    }
        return (
            <>
                {renderMetrics()}
            </>
        )
}

export default CoinMetrics;