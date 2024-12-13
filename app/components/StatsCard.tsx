"use client"
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ASSET_DATA_API_URL) {
      throw new Error("Environment variable NEXT_PUBLIC_ASSET_DATA_API_URL is required but not defined.");
    }

    const fetchAssetPrice = async () => {
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
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        setLoading(false);
      }
    }
    fetchAssetPrice();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">StatsCard</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {goldPrice && (
        <div>
          <p>Gold Price: {goldPrice.price}</p> {/* Update 'price' based on API structure */}
        </div>
      )}
      {silverPrice && (
        <div>
          <p>Silver Price: {silverPrice.price}</p> {/* Update 'price' based on API structure */}
        </div>
      )}
      {bitcoinPrice && (
        <div>
          <p>Bitcoin Price: {bitcoinPrice.price}</p> {/* Update 'price' based on API structure */}
        </div>
      )}
      {ethereumPrice && (
        <div>
          <p>Ethereum Price: {ethereumPrice.price}</p> {/* Update 'price' based on API structure */}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
