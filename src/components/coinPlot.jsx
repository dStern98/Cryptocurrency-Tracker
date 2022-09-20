import React, {useEffect, useState} from "react";
import axiosInstance from "../apis/axiosAPI";
import Plot from 'react-plotly.js';

const CoinPlot = ({coin, currency}) => {
    const [chartDays, setChartDays] = useState(31);
    const [chartData, setChartData] = useState([]);
    const [chartColor, setChartColor] = useState("green");

    const formatData = (api_array)=> {
        const times = api_array.map((sub_array)=> {
            let date = new Date(sub_array[0])
            return date.toISOString();


        });
        const prices = api_array.map((sub_array)=> sub_array[1].toFixed(2))
        return [times, prices]
        }
    
    const evaluateChartColor = (prices)=> {
        if (prices[0][1] - prices[prices.length-1][1] > 0) {
            return "red";
        }
        return "green";
    }

    useEffect(()=> {
        const fetchPlotData = async () => {
            try {
                const response = await axiosInstance.get(`/coins/${coin}/market_chart`, {
                    params: {
                        vs_currency: currency.vs_currency,
                        days: chartDays
                    }
                });
                setChartColor(evaluateChartColor(response.data.prices));
                setChartData(formatData(response.data.prices));
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchPlotData();
    }, [chartDays, currency, coin])



    const renderChart = () => {
        if (chartData.length>0) {
            return (
                <Plot
        data={[
          {
            x: chartData[0],
            y: chartData[1],
            type: 'scatter',
            mode: 'lines',
            marker: {color: chartColor},
          },
        ]}
        layout={{autosize: true, title: `${coin}`,
        yaxis: {
            title: `${currency?.symbol}`
          }}}
        useResizeHandler={true}
        style={{width: "100%", height: "100%"}}
      />
            )
        }
        else {
            return <p>Loading...</p>
        }
    }

    // To reduce verbosity, changed to using an array and mapping over
    const chart_buttons = [
        {days: 1, string_repr: "1D"},
        {days: 7, string_repr: "1W"},
        {days: 31, string_repr: "1M"},
        {days: 93, string_repr: "3M"},
        {days: 186, string_repr: "6M"},
        {days: 365, string_repr: "1Y"},
        {days: 730, string_repr: "2Y"},
        {days: 1095, string_repr: "5Y"},
        {days: 2190, string_repr: "10Y"}
    ]

    return (
        <div className="d-flex flex-column shadow-sm bg-white pt-1">
            <div className="d-flex flex-row justify-content-center my-1">
                {
                    chart_buttons.map(({days, string_repr}) => {
                        return (
                            <button key={days} className={`btn mx-1 ${chartDays===days? "active btn-dark": ""}`}
                             onClick={()=> setChartDays(days)}>{string_repr}</button>
                        )
                    })
                }
            </div>
            <div className="graph-div">
                {renderChart()}
            </div>
        </div>
    )
}

export default CoinPlot;