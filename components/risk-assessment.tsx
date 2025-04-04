import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function RiskAssessment() {
  const riskScore = 65; // This would be calculated based on the portfolio composition

  const getRiskLevel = (score: number) => {
    if (score < 20) return "Very Low";
    if (score < 40) return "Low";
    if (score < 60) return "Moderate";
    if (score < 80) return "High";
    return "Very High";
  }

  const getRiskColor = (score: number) => {
    if (score < 20) return "bg-green-500";
    if (score < 40) return "bg-lime-500";
    if (score < 60) return "bg-yellow-500";
    if (score < 80) return "bg-orange-500";
    return "bg-red-500";
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Portfolio Risk Assessment</CardTitle>
        <CardDescription>Evaluation of your portfolio's risk level</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{getRiskLevel(riskScore)}</span>
            <span className="text-2xl font-bold">{riskScore}/100</span>
          </div>
          <Progress value={riskScore} className={`h-3 ${getRiskColor(riskScore)}`} />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Your portfolio has a {getRiskLevel(riskScore).toLowerCase()} level of risk. This assessment is based on your asset allocation, market volatility, and sector concentration.
            </p>
            <p className="text-sm text-muted-foreground">
              Consider diversifying your portfolio or adjusting your asset allocation to manage your risk exposure. Regular rebalancing can help maintain your desired risk level.
    </p>
  </div>
</div>
      </CardContent>
    </Card>
  )
}

