import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<any>(null);
  const [scores, setScores] = useState({
    strategy: 0,
    structure: 0,
    systems: 0,
    sharedValues: 0,
    style: 0,
    staff: 0,
    skills: 0,
    overall: 0,
  });

  useEffect(() => {
    const profileData = localStorage.getItem("companyProfile");
    const assessmentData = localStorage.getItem("assessmentData");

    if (!profileData || !assessmentData) {
      navigate("/profile");
      return;
    }

    setCompanyData(JSON.parse(profileData));
    
    // Simple scoring logic - in a real app, this would be more sophisticated
    const assessment = JSON.parse(assessmentData);
    const newScores = {
      strategy: calculateScore(assessment.strategy),
      structure: calculateScore(assessment.structure),
      systems: calculateScore(assessment.systems),
      sharedValues: calculateScore(assessment.sharedValues),
      style: calculateScore(assessment.style),
      staff: calculateScore(assessment.staff),
      skills: calculateScore(assessment.skills),
      overall: 0,
    };
    
    newScores.overall = Math.round(
      (newScores.strategy + newScores.structure + newScores.systems + 
       newScores.sharedValues + newScores.style + newScores.staff + newScores.skills) / 7
    );

    setScores(newScores);
  }, [navigate]);

  const calculateScore = (data: any): number => {
    if (!data) return 50;
    
    // Extract numeric scores from data
    const numericValues = Object.values(data)
      .filter((val): val is number => typeof val === "number")
      .filter(val => val >= 1 && val <= 10);
    
    if (numericValues.length === 0) return 50;
    
    const average = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
    return Math.round(average * 10);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Strong";
    if (score >= 50) return "Moderate";
    return "Needs Attention";
  };

  if (!companyData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4 max-w-6xl animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Alignment Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            {companyData.companyName} - Overall Alignment Score
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>Step 3 of 3</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-success w-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="shadow-xl border-none mb-8 bg-gradient-to-br from-card to-primary-light">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Organizational Alignment</span>
              <TrendingUp className="w-6 h-6 text-primary" />
            </CardTitle>
            <CardDescription>Based on your McKinsey 7S assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className={`text-7xl font-bold mb-4 ${getScoreColor(scores.overall)}`}>
                {scores.overall}
              </div>
              <div className="text-2xl font-semibold text-foreground mb-2">
                {getScoreLabel(scores.overall)}
              </div>
              <p className="text-muted-foreground">
                out of 100 points
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Individual Scores */}
        <Card className="shadow-lg border-none mb-8">
          <CardHeader>
            <CardTitle>7S Element Scores</CardTitle>
            <CardDescription>Individual assessment of each framework element</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: "strategy", label: "Strategy", icon: "📊" },
                { key: "structure", label: "Structure", icon: "🏢" },
                { key: "systems", label: "Systems", icon: "⚙️" },
                { key: "sharedValues", label: "Shared Values", icon: "❤️" },
                { key: "style", label: "Style", icon: "👔" },
                { key: "staff", label: "Staff", icon: "👥" },
                { key: "skills", label: "Skills", icon: "🎯" },
              ].map((element) => (
                <div key={element.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{element.icon}</span>
                    <span className="font-semibold text-foreground">{element.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${getScoreColor(scores[element.key as keyof typeof scores])}`}>
                      {scores[element.key as keyof typeof scores]}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getScoreLabel(scores[element.key as keyof typeof scores])}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
            <CardDescription>Continue your organizational transformation journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              Your assessment is complete! The next phases will include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Detailed tension diagnosis and misalignment identification</li>
              <li>Interactive decision-making simulation with budget constraints</li>
              <li>Real-time feedback on cascading effects of your choices</li>
              <li>Personalized recommendations and learning insights</li>
            </ul>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80"
                onClick={() => navigate("/tension-diagnosis")}
              >
                Continue to Tension Diagnosis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
