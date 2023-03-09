import React, { useEffect, useState } from "react";
import axiosInstance from "../apis/axiosAPI";
import { AiFillGithub, AiFillRedditCircle } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { SiHiveBlockchain } from "react-icons/si";

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

  const renderLinkIcons = () => {
    //Get the Required Links, returning a set of <a> tags surrounding
    // the Icons.
    const githubLink = coinAbout?.links?.repos_url?.github[0];
    const homepageLink = coinAbout?.links?.homepage[0];
    const redditLink = coinAbout?.links?.subreddit_url;
    const blockchainSite = coinAbout?.links?.blockchain_site[0];

    return (
      <>
        <a href={githubLink} className="mx-1">
          <AiFillGithub size={25} />
        </a>
        <a href={redditLink} className="mx-1">
          <AiFillRedditCircle size={25} />
        </a>
        <a href={homepageLink} className="mx-1">
          <FaHome size={25} />
        </a>
        <a href={blockchainSite} className="mx-1">
          <SiHiveBlockchain size={25} />
        </a>
      </>
    );
  };

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
        <div className="d-flex flex-column justify-content-between align-items-center">
          <span className="fs-6">Links</span>
          <span className="d-flex flex-row justify-content-between align-items-start">
            {renderLinkIcons()}
          </span>
        </div>
      </div>
    );
  };

  return <>{renderAbout()}</>;
};

export default AboutCoin;
