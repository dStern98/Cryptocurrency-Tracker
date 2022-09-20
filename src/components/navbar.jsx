import React, {useState, useContext} from "react";
import {availableCurrencies} from "../currencyList";
import { CoinListContext } from "../contexts/trackListContext";
import {Link, useLocation} from "react-router-dom";


const Navbar = () => {
    const {currency, setCurrency, availableCoins, addCoin} = useContext(CoinListContext);
    const [searchValue, setSearchValue] = useState("");
    const location = useLocation();
    console.log(location.pathname);


    const handleListItemClick = (vs_currency, symbol) => {
        setCurrency({vs_currency, symbol});
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const chosenCoin = availableCoins.find((item)=> item.name === searchValue)
        if (chosenCoin) {
            addCoin(chosenCoin.id);
            setSearchValue("");
        }

    }

    const renderSearchBar = () => {
        if (location.pathname === "/") {
            return (
                <div>
                <form onSubmit={handleSearchSubmit}>
                        <input className="form-control" list="datalistOptions" id="coinSearch" 
                        onChange={(e)=> setSearchValue(e.target.value)} value={searchValue}
                        placeholder="Add to Watchlist"/>
                        <datalist id="datalistOptions">
                            {availableCoins.map((coin_details)=> {
                                const {id, name} = coin_details;
                                return (
                                    <option key={id} value={name}/>
                                )
                            })}
                        </datalist>
                </form>
            </div>
            )
        }
        return (
            <h2 className="text-decoration-none navbar-brand">Coin Info</h2>
        )
    }


    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid d-flex justify-content-around align-items-center">
                <Link to="/" className="text-decoration-none navbar-brand">Home</Link>
                {renderSearchBar()}
                <div className="dropdown dropdown-center">
                        <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                            {currency.symbol}-{currency.vs_currency.toUpperCase()}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {availableCurrencies.map(({vs_currency, full_name, symbol}) => {
                                return (
                                    <li key={vs_currency}>
                                        <button className="dropdown-item" type="button"
                                        onClick={()=>handleListItemClick(vs_currency, symbol)}>{symbol}-{full_name}</button>
                                    </li>
                                )
                            })}
                        </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;