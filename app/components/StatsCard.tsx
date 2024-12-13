"use client"
import React, { useEffect, useState } from 'react';

interface GoldPriceData {
  price: number; // Update this type based on your API response
  [key: string]: any; // Optional: Allows flexibility for additional fields
}

interface SilverPriceData {
  price: number; // Update this type based on your API response
  [key: string]: any; // Optional: Allows flexibility for additional fields
}

const StatsCard: React.FC = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPriceData | null>(null);
  const [silverPrice, setSilverPrice] = useState<SilverPriceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ASSET_DATA_API_URL) {
      throw new Error("Environment variable NEXT_PUBLIC_ASSET_DATA_API_URL is required but not defined.");
    }
    const assetPriceEndpoint: string = process.env.NEXT_PUBLIC_ASSET_DATA_API_URL;
    const fetchGoldPrice = async () => {
      try {
        const goldPriceEndpoint = assetPriceEndpoint + process.env.NEXT_PUBLIC_GOLD_ASSET_CODE + "/";
        const response = await fetch(goldPriceEndpoint);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const goldData: GoldPriceData = await response.json();
        setGoldPrice(goldData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        setLoading(false);
      }
    };

    const fetchSilverPrice = async () => {
      try {
        const response = await fetch(assetPriceEndpoint + process.env.NEXT_PUBLIC_SILVER_ASSET_CODE + "/");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const silverData: SilverPriceData = await response.json();
        setSilverPrice(silverData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        setLoading(false);
      }
    }

    fetchGoldPrice();
    fetchSilverPrice();
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
    </div>
  );
};

export default StatsCard;
