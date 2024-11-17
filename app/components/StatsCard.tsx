"use client"
import React, { useEffect, useState } from 'react';

interface GoldPriceData {
  price: number; // Update this type based on your API response
  [key: string]: any; // Optional: Allows flexibility for additional fields
}

const StatsCard: React.FC = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPriceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch('http://127.0.0.1:9090/gold-data/gold-price/');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: GoldPriceData = await response.json();
        setGoldPrice(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchGoldPrice();
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
    </div>
  );
};

export default StatsCard;
