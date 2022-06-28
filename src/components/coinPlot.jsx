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
            title: `${currency.symbol}`
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
    return (
        <div className="d-flex flex-column shadow-sm bg-white pt-1">
            <div className="d-flex flex-row justify-content-center my-1">
                <button className={`btn mx-1 ${chartDays===1? "active btn-dark": ""}`} onClick={()=> setChartDays(1)}>1D</button>
                <button className={`btn mx-1 ${chartDays===7? "active btn-dark": ""}`} onClick={()=> setChartDays(7)}>1W</button>
                <button className={`btn mx-1 ${chartDays===31? "active btn-dark": ""}`} onClick={()=> setChartDays(31)}>1M</button>
                <button className={`btn mx-1 ${chartDays===93? "active btn-dark": ""}`} onClick={()=> setChartDays(93)}>3M</button>
                <button className={`btn mx-1 ${chartDays===186? "active btn-dark": ""}`} onClick={()=> setChartDays(186)}>6M</button>
                <button className={`btn mx-1 ${chartDays===365? "active btn-dark": ""}`} onClick={()=> setChartDays(365)}>1Y</button>
                <button className={`btn mx-1 ${chartDays===730? "active btn-dark": ""}`} onClick={()=> setChartDays(730)}>2Y</button>
                <button className={`btn mx-1 ${chartDays===1095? "active btn-dark": ""}`} onClick={()=> setChartDays(1095)}>5Y</button>
                <button className={`btn mx-1 ${chartDays===2190? "active btn-dark": ""}`} onClick={()=> setChartDays(2190)}>10Y</button>
            </div>
            <div className="graph-div">
                {renderChart()}
            </div>
        </div>
    )
}

export default CoinPlot;