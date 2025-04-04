import { Card, CardContent } from "@/components/ui/card"

const newsItems = [
  {
    id: 1,
    title: "Fed Announces Interest Rate Decision",
    source: "Financial Times",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Tech Giants Report Strong Quarterly Earnings",
    source: "Wall Street Journal",
    time: "4 hours ago",
  },
  {
    id: 3,
    title: "Oil Prices Surge Amid Geopolitical Tensions",
    source: "Reuters",
    time: "6 hours ago",
  },
  {
    id: 4,
    title: "New Cryptocurrency Regulations Proposed",
    source: "Bloomberg",
    time: "8 hours ago",
  },
]

export function NewsWidget() {
  return (
    <div className="space-y-4">
      {newsItems.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <h3 className="font-semibold">{item.title}</h3>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{item.source}</span>
              <span>{item.time}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

