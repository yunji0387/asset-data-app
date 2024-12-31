"use client";
import React, { useEffect, useState } from "react";

interface AssetPriceData {
  price: number;
  [key: string]: any;
}

const StatsCard: React.FC = () => {
  const [goldPrice, setGoldPrice] = useState<AssetPriceData | null>(null);
  const [silverPrice, setSilverPrice] = useState<AssetPriceData | null>(null);
  const [bitcoinPrice, setBitcoinPrice] = useState<AssetPriceData | null>(null);
  const [ethereumPrice, setEthereumPrice] = useState<AssetPriceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchAssetPrice = async () => {
    if (!process.env.NEXT_PUBLIC_ASSET_DATA_API_URL) {
      throw new Error(
        "Environment variable NEXT_PUBLIC_ASSET_DATA_API_URL is required but not defined."
      );
    }

    setLoading(true);
    setError(null); // Reset error state before fetching new data

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ASSET_DATA_API_URL as string);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const assetData: any = await response.json();
      setGoldPrice(assetData.XAU);
      setSilverPrice(assetData.XAG);
      setBitcoinPrice(assetData.BTC);
      setEthereumPrice(assetData.ETH);

      const currentTime = new Date();
      setLastUpdated(currentTime.toLocaleString());
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssetPrice();
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={fetchAssetPrice}
          className={`flex items-center justify-center text-white transition duration-300 ease-in-out transform ${!loading && "hover:rotate-90"
            }`}
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            className={`${loading && "animate-spin"}`}
          >
            <polyline points="20.5 4 20.5 8 16.5 8"></polyline>
            <path d="M21 12A9 9 0 1 1 19 6.3"></path>
          </svg>
        </button>

        {/* <button
          onClick={fetchAssetPrice}
          className={`text-white transition duration-300 ease-in-out transform ${!loading && "hover:scale-105 hover:rotate-90"
            }`}
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="24"
            height="24"
            className={`${loading && "animate-spin"}`}
          >
            <polyline points="19 2 19 6 15 6"></polyline>
            <path d="M20.49 12A9 9 0 1 1 19 5.51"></path>
          </svg>
        </button> */}
        <h2 className="text-xl font-bold">Price</h2>
      </div>
      {error && <p className="text-red-500">Error: {error}</p>}
      {lastUpdated && (
        <p className="text-gray-500 text-sm">
          Last Updated: {lastUpdated}
        </p>
      )}
      {goldPrice && (
        <div>
          <p>Gold: {goldPrice.price}</p>
        </div>
      )}
      {silverPrice && (
        <div>
          <p>Silver: {silverPrice.price}</p>
        </div>
      )}
      {bitcoinPrice && (
        <div>
          <p>Bitcoin: {bitcoinPrice.price}</p>
        </div>
      )}
      {ethereumPrice && (
        <div>
          <p>Ethereum: {ethereumPrice.price}</p>
        </div>
      )}
    </div>
  );
};

export default StatsCard;