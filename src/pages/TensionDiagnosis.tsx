import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, Clock, Users, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Tension {
  id: string;
  title: string;
  elements: [string, string];
  description: string;
  severity: "critical" | "high" | "moderate" | "low";
  impact: string;
  timeframe: string;
  stakeholders: string[];
}

const TensionDiagnosis = () => {
  const navigate = useNavigate();
  const [tensions, setTensions] = useState<Tension[]>([]);
  const [selectedTension, setSelectedTension] = useState<string | null>(null);
  const [scores, setScores] = useState<any>({});

  useEffect(() => {
    const assessmentData = localStorage.getItem("assessmentData");
    const profileData = localStorage.getItem("companyProfile");

    if (!assessmentData || !profileData) {
      navigate("/profile");
      return;
    }

    const assessment = JSON.parse(assessmentData);
    const calculatedScores = {
      strategy: calculateScore(assessment.strategy),
      structure: calculateScore(assessment.structure),
      systems: calculateScore(assessment.systems),
      sharedValues: calculateScore(assessment.sharedValues),
      style: calculateScore(assessment.style),
      staff: calculateScore(assessment.staff),
      skills: calculateScore(assessment.skills),
    };

    setScores(calculatedScores);
    setTensions(identifyTensions(assessment, calculatedScores));
  }, [navigate]);

  const calculateScore = (data: any): number => {
    if (!data) return 50;
    const numericValues = Object.values(data)
      .filter((val): val is number => typeof val === "number")
      .filter(val => val >= 1 && val <= 10);
    if (numericValues.length === 0) return 50;
    const average = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
    return Math.round(average * 10);
  };

  const identifyTensions = (assessment: any, scores: any): Tension[] => {
    const detectedTensions: Tension[] = [];

    // Strategy-Structure Tension
    if (Math.abs(scores.strategy - scores.structure) > 20) {
      detectedTensions.push({
        id: "strategy-structure",
        title: "Strategy-Structure Misalignment",
        elements: ["strategy", "structure"],
        description: scores.strategy > scores.structure 
          ? "Your organizational structure may not support your strategic ambitions. Decentralized or unclear reporting lines could hinder execution."
          : "Your structure is more developed than your strategy. Consider refining strategic direction to leverage your organizational capabilities.",
        severity: Math.abs(scores.strategy - scores.structure) > 30 ? "critical" : "high",
        impact: "Execution delays, missed strategic targets, resource misallocation",
        timeframe: "6-12 months",
        stakeholders: ["Leadership Team", "Department Heads", "Investors"]
      });
    }

    // Systems-Strategy Gap
    if (scores.systems < 60 && scores.strategy > 70) {
      detectedTensions.push({
        id: "systems-strategy",
        title: "Systems-Strategy Gap",
        elements: ["systems", "strategy"],
        description: "Legacy or inadequate systems are creating friction in achieving your strategic goals. Modern strategy requires modern infrastructure.",
        severity: "high",
        impact: "Data blind spots, manual workarounds, competitive disadvantage, slower time-to-market",
        timeframe: "Immediate to 6 months",
        stakeholders: ["IT Department", "Operations", "Data Teams", "End Users"]
      });
    }

    // Skills-Strategy Misalignment
    if (Math.abs(scores.skills - scores.strategy) > 25) {
      detectedTensions.push({
        id: "skills-strategy",
        title: "Skills-Strategy Disconnect",
        elements: ["skills", "strategy"],
        description: scores.strategy > scores.skills
          ? "Current workforce capabilities show gaps in skills needed for your strategic direction. This will limit execution effectiveness."
          : "Your team has strong capabilities that aren't fully leveraged by current strategy.",
        severity: scores.strategy > scores.skills ? "critical" : "moderate",
        impact: "Inability to execute initiatives, increased dependency on external consultants, employee frustration, talent attrition",
        timeframe: "12-24 months",
        stakeholders: ["Employees", "HR", "Learning & Development", "Business Units"]
      });
    }

    // Structure-Staff Friction
    if (scores.structure < 60 && scores.staff < 65) {
      detectedTensions.push({
        id: "structure-staff",
        title: "Structure-Staff Tension",
        elements: ["structure", "staff"],
        description: "Organizational structure may be straining employee satisfaction. Rapid growth or unclear roles can erode culture and engagement.",
        severity: "high",
        impact: "Rising turnover, decreased productivity, loss of institutional knowledge, recruitment challenges",
        timeframe: "6-18 months",
        stakeholders: ["Employees", "HR", "People Managers", "Recruitment Teams"]
      });
    }

    // Style-Systems Conflict
    if (scores.style < 60 && scores.systems < 60) {
      detectedTensions.push({
        id: "style-systems",
        title: "Leadership Style-Systems Conflict",
        elements: ["style", "systems"],
        description: "Leadership approach and system capabilities are misaligned. Decision-making style may not match the speed or formality required by systems infrastructure.",
        severity: "moderate",
        impact: "Decision bottlenecks, resistance to system adoption, workarounds that bypass controls",
        timeframe: "6-12 months",
        stakeholders: ["Leadership Team", "Middle Management", "IT Department"]
      });
    }

    // Shared Values-Structure Challenge
    if (Math.abs(scores.sharedValues - scores.structure) > 20) {
      detectedTensions.push({
        id: "values-structure",
        title: "Cultural Values-Structure Gap",
        elements: ["sharedValues", "structure"],
        description: "Organizational structure may not reflect or support your stated values. Decentralized operations can lead to varying interpretations of core principles.",
        severity: "moderate",
        impact: "Inconsistent customer experience, internal confusion, employer brand dilution, ethical risks",
        timeframe: "12-24 months",
        stakeholders: ["All Employees", "Customers", "Brand & Communications", "Compliance"]
      });
    }

    // Systems-Skills Dependency
    if (scores.systems > 70 && scores.skills < 60) {
      detectedTensions.push({
        id: "systems-skills",
        title: "Advanced Systems, Insufficient Skills",
        elements: ["systems", "skills"],
        description: "Investment in modern systems won't deliver ROI without corresponding skills development. Low adoption and underutilization are likely.",
        severity: "high",
        impact: "Wasted technology investment, low system adoption rates, delayed benefits realization",
        timeframe: "3-12 months",
        stakeholders: ["IT Department", "End Users", "Training Teams", "CFO"]
      });
    }

    return detectedTensions.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, moderate: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
  };

  const getSeverityColor = (severity: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "moderate": return "secondary";
      default: return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return "🔴";
      case "high": return "🟠";
      case "moderate": return "🟡";
      default: return "🟢";
    }
  };

  const getElementColor = (element: string) => {
    const colors: Record<string, string> = {
      strategy: "bg-blue-500",
      structure: "bg-purple-500",
      systems: "bg-green-500",
      sharedValues: "bg-red-500",
      style: "bg-yellow-500",
      staff: "bg-pink-500",
      skills: "bg-teal-500"
    };
    return colors[element] || "bg-gray-500";
  };

  const getElementPosition = (element: string) => {
    const positions: Record<string, { x: number; y: number }> = {
      sharedValues: { x: 50, y: 50 }, // Center
      strategy: { x: 50, y: 15 },
      structure: { x: 85, y: 35 },
      systems: { x: 85, y: 65 },
      skills: { x: 50, y: 85 },
      staff: { x: 15, y: 65 },
      style: { x: 15, y: 35 }
    };
    return positions[element] || { x: 50, y: 50 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4 max-w-7xl animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 text-warning" />
            <h1 className="text-3xl font-bold text-foreground">Tension Diagnosis</h1>
          </div>
          <p className="text-muted-foreground">
            Identified organizational misalignments and their potential impacts
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>Phase 3: Diagnosis</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-3/4 transition-all duration-500"></div>
          </div>
        </div>

        {/* Summary Alert */}
        <Alert className="mb-8 border-warning bg-warning/5">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription>
            We've identified <strong>{tensions.length} key tensions</strong> in your organizational alignment. 
            These represent areas where misalignment between elements could impact performance.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Tension Map Visualization */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>7S Tension Map</CardTitle>
              <CardDescription>Interactive visualization of misalignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-square bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg">
                {/* Draw tension lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  {tensions.map((tension) => {
                    const elem1Pos = getElementPosition(tension.elements[0]);
                    const elem2Pos = getElementPosition(tension.elements[1]);
                    const isSelected = selectedTension === tension.id;
                    const strokeWidth = tension.severity === "critical" ? 4 : tension.severity === "high" ? 3 : 2;
                    
                    return (
                      <line
                        key={tension.id}
                        x1={`${elem1Pos.x}%`}
                        y1={`${elem1Pos.y}%`}
                        x2={`${elem2Pos.x}%`}
                        y2={`${elem2Pos.y}%`}
                        stroke={isSelected ? "hsl(var(--primary))" : tension.severity === "critical" ? "#ef4444" : tension.severity === "high" ? "#f97316" : "#eab308"}
                        strokeWidth={isSelected ? strokeWidth + 2 : strokeWidth}
                        strokeDasharray={isSelected ? "0" : "5,5"}
                        opacity={isSelected ? 1 : 0.4}
                        className="transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedTension(selectedTension === tension.id ? null : tension.id)}
                      />
                    );
                  })}
                </svg>

                {/* Draw element nodes */}
                {Object.entries(scores).map(([element, score]) => {
                  const pos = getElementPosition(element);
                  const involvedInTension = tensions.some(t => 
                    t.elements.includes(element) && (selectedTension ? t.id === selectedTension : true)
                  );
                  
                  return (
                    <div
                      key={element}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: 2 }}
                    >
                      <div className={`${getElementColor(element)} rounded-full p-4 shadow-lg ${involvedInTension ? 'ring-4 ring-primary' : ''}`}>
                        <div className="text-white text-center">
                          <div className="text-xs font-semibold mb-1 capitalize">{element}</div>
                          <div className="text-lg font-bold">{score as number}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-sm text-muted-foreground text-center">
                Click on tension lines to highlight specific misalignments
              </div>
            </CardContent>
          </Card>

          {/* Tension List */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>Identified Tensions</CardTitle>
              <CardDescription>Priority-ranked organizational misalignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {tensions.map((tension) => (
                  <div
                    key={tension.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTension === tension.id 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedTension(selectedTension === tension.id ? null : tension.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xl">{getSeverityIcon(tension.severity)}</span>
                        <h4 className="font-semibold text-foreground">{tension.title}</h4>
                      </div>
                      <Badge variant={getSeverityColor(tension.severity) as "default" | "destructive" | "outline" | "secondary"}>
                        {tension.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{tension.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{tension.timeframe}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Forecasting */}
        {selectedTension && tensions.find(t => t.id === selectedTension) && (
          <Card className="shadow-lg border-none mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-destructive" />
                Impact Forecast: {tensions.find(t => t.id === selectedTension)?.title}
              </CardTitle>
              <CardDescription>Detailed analysis of potential consequences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    Severity Level
                  </h4>
                  <Badge variant={getSeverityColor(tensions.find(t => t.id === selectedTension)!.severity) as "default" | "destructive" | "outline" | "secondary"} className="text-sm">
                    {tensions.find(t => t.id === selectedTension)!.severity.toUpperCase()}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    Requires {tensions.find(t => t.id === selectedTension)!.severity === "critical" ? "immediate" : "prompt"} attention
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Time to Crisis
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {tensions.find(t => t.id === selectedTension)!.timeframe}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Estimated timeframe if unaddressed
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Affected Stakeholders
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {tensions.find(t => t.id === selectedTension)!.stakeholders.map((stakeholder) => (
                      <Badge key={stakeholder} variant="outline" className="text-xs">
                        {stakeholder}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Projected Impact</h4>
                <p className="text-sm text-muted-foreground">
                  {tensions.find(t => t.id === selectedTension)!.impact}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle>Ready to Address These Tensions?</CardTitle>
            <CardDescription>Move to decision simulation phase</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground mb-4">
              Now that you understand the misalignments in your organization, it's time to make strategic decisions. 
              You'll work with budget constraints to prioritize interventions and see their cascading effects.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80"
              onClick={() => {
                // Store tensions for next phase
                localStorage.setItem("diagnosedTensions", JSON.stringify(tensions));
                alert("Decision simulation coming in next phase!");
              }}
            >
              Continue to Decision Simulation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TensionDiagnosis;
