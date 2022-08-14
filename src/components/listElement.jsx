import React from "react";
import { Link } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";


const ListElement = ({coin_data, deleteCoin, currency}) => {
    const {symbol, id, image, price_change_percentage_24h, current_price} = coin_data;


    return (
        <Link to={`/${id}`} className="text-decoration-none">
        <li className="list-group-item list-group-item-action list-element d-flex justify-content-around
        align-items-center">
            <img className="coin-list-image" src={image} alt="Coin Symbol"></img>
            <div className="d-flex justify-content-around
                            align-items-center flex-column">
                <span className="fs-4">{symbol?.toUpperCase()}</span>
                <span className="fs-6">{id}</span>
            </div>
            <span className="fs-5">{currency.symbol}{current_price?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            <span className={`fs-5 ${price_change_percentage_24h > 0? "text-success": "text-danger"}`}>
                <span>{price_change_percentage_24h > 0 ? "+": ""}{price_change_percentage_24h?.toFixed(2)}%</span>
                <span className="text-danger mx-2 delete-icon"
                onClick={(e)=> {
                    e.preventDefault();
                    deleteCoin(coin_data.id);
                } }><BsFillXCircleFill size={19}/></span>
            </span>
        </li>
        </Link>
    )
}

export default ListElement;