import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from 'lucide-react'

export function MarketOverview() {
  const markets = [
    { name: "S&P 500", value: "4,587.64", change: "+37.51 (+0.82%)", trend: "up" },
    { name: "Nasdaq", value: "14,346.02", change: "-89.24 (-0.62%)", trend: "down" },
    { name: "Dow Jones", value: "35,950.89", change: "+124.17 (+0.35%)", trend: "up" },
    { name: "Russell 2000", value: "1,988.33", change: "-12.75 (-0.64%)", trend: "down" },
    { name: "VIX", value: "16.32", change: "-0.86 (-5.00%)", trend: "down" },
  ]

  return (
    <div className="space-y-4">
      {markets.map((market) => (
        <div key={market.name} className="flex items-center hover:bg-muted p-2 rounded-md transition-colors">
          <div className="w-1/3 font-medium">{market.name}</div>
          <div className="w-1/3 text-right">{market.value}</div>
          <div className={`w-1/3 text-right ${market.trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {market.change}
            {market.trend === "up" ? (
              <ArrowUpIcon className="inline ml-1" />
            ) : (
              <ArrowDownIcon className="inline ml-1" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

