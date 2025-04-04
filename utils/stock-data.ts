import { useState, useEffect } from 'react';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  shares: number;
}

const initialStocks: StockData[] = [
  { symbol: 'AAPL', price: 150.25, change: 0, changePercent: 0, shares: 100 },
  { symbol: 'GOOGL', price: 2750.80, change: 0, changePercent: 0, shares: 20 },
  { symbol: 'MSFT', price: 305.50, change: 0, changePercent: 0, shares: 50 },
  { symbol: 'AMZN', price: 3380.00, change: 0, changePercent: 0, shares: 15 },
  { symbol: 'FB', price: 330.75, change: 0, changePercent: 0, shares: 40 },
  { symbol: 'TSLA', price: 750.25, change: 0, changePercent: 0, shares: 30 },
  { symbol: 'NVDA', price: 220.80, change: 0, changePercent: 0, shares: 75 },
  { symbol: 'JPM', price: 155.90, change: 0, changePercent: 0, shares: 60 },
  { symbol: 'JNJ', price: 170.50, change: 0, changePercent: 0, shares: 45 },
  { symbol: 'V', price: 240.30, change: 0, changePercent: 0, shares: 55 },
];

export function useStockData() {
  const [stocks, setStocks] = useState<StockData[]>(initialStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const changePercent = (Math.random() - 0.5) * 2; // -1% to +1%
          const change = stock.price * (changePercent / 100);
          const newPrice = stock.price + change;
          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2)),
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return stocks;
}

