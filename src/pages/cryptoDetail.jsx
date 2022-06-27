import React, {useContext} from "react";
import {useParams} from "react-router-dom";
import {CoinListContext} from "../contexts/trackListContext";
import CoinPlot from "../components/coinPlot";
import CoinMetrics from "../components/coinMetrics";


const CryptoDetail = () => {
    const {coin} = useParams(); 
    const {currency} = useContext(CoinListContext)
    return (
        <div className="container mt-2">
            <CoinPlot coin={coin} currency={currency}/>
            <CoinMetrics coin={coin} currency={currency}/>
        </div>
    )
}

export default CryptoDetail;