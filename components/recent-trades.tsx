import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentTrades = [
  { id: 1, stock: "AAPL", action: "Buy", quantity: 50, price: 150.25, date: "2023-06-15" },
  { id: 2, stock: "GOOGL", action: "Sell", quantity: 10, price: 2500.75, date: "2023-06-14" },
  { id: 3, stock: "MSFT", action: "Buy", quantity: 25, price: 300.50, date: "2023-06-13" },
  { id: 4, stock: "AMZN", action: "Sell", quantity: 5, price: 3200.00, date: "2023-06-12" },
  { id: 5, stock: "TSLA", action: "Buy", quantity: 15, price: 650.75, date: "2023-06-11" },
]

export function RecentTrades() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Stock</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentTrades.map((trade) => (
          <TableRow key={trade.id}>
            <TableCell className="font-medium">{trade.stock}</TableCell>
            <TableCell>{trade.action}</TableCell>
            <TableCell>{trade.quantity}</TableCell>
            <TableCell>${trade.price.toFixed(2)}</TableCell>
            <TableCell>{trade.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

