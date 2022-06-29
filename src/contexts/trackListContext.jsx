import React, {createContext, useState, useEffect} from "react";
import axiosInstance from "../apis/axiosAPI";

export const CoinListContext = createContext();

export const CoinListContextProvider = (props) => {

    const [availableCoins, setAvailableCoins] = useState([]);
    const [trackList, setTrackList] = useState(localStorage.getItem("watchList").split(",") || ["bitcoin", "ethereum","cardano", "tether"]);
    const [currency, setCurrency] = useState({vs_currency: "usd", symbol: "$"});

    //Logic to delete and add new coins to the tracked list
    const deleteCoin = (coin_id) => {
        setTrackList(trackList.filter((listItem)=> listItem !== coin_id))
    }

    const addCoin = (coin_id) => {
        if (!trackList.find((item)=> item === coin_id)) {
            setTrackList([...trackList, coin_id]);
        }
    }

    //Get all of the Available Coins
    useEffect(()=> {
        const fetchAllCoins = async () => {
            try {
                const response = await axiosInstance.get("/coins/list", {params:{
                    include_platform: false}})
                setAvailableCoins(response.data);

            }
            catch (error) {
                console.log(error);
            }
            
        }
        fetchAllCoins();
    }, [])

    useEffect(()=> {
        localStorage.setItem("watchList", trackList.join(","));
    }, [trackList])

    return (
        <CoinListContext.Provider 
        value={{currency, setCurrency, availableCoins, trackList,
        deleteCoin, addCoin}}>
            {props.children}
        </CoinListContext.Provider>
    )
}