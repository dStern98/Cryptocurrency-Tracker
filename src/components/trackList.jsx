import React, {useContext, useEffect, useState} from "react";
import { CoinListContext} from "../contexts/trackListContext";
import axiosInstance from "../apis/axiosAPI";
import ListElement from "./listElement";

const TrackList = () => {
    const {trackList, deleteCoin, currency} = useContext(CoinListContext);
    const [trackedCoinData, setTrackedCoinData] = useState([]);

    useEffect(() => {
        const getCurrentCoinData = async () => {
            try {
                const response = await axiosInstance.get("/coins/markets", {
                    params: {
                        vs_currency: currency.vs_currency,
                        ids: trackList.join(",")
                    }
                })
                setTrackedCoinData(response.data);

            }
            catch (error) {
                console.log(error);
            }
        }

        if (trackList.length > 0) {
            getCurrentCoinData();
        }
        else {
            setTrackedCoinData([]);
        }
    }, [trackList, currency])

    return (
        <div className="container mt-4">
             <ul className="list-group">
                {trackedCoinData.map((coin_data) => {
                    return (
                        <ListElement key={coin_data.id} coin_data={coin_data}
                        deleteCoin={deleteCoin} currency={currency}/>
                    )
                })}
            </ul>
        </div>
    )
}


export default TrackList;