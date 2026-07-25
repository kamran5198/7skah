import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StrategyAssessment from "@/components/assessment/StrategyAssessment";
import StructureAssessment from "@/components/assessment/StructureAssessment";
import SystemsAssessment from "@/components/assessment/SystemsAssessment";
import SharedValuesAssessment from "@/components/assessment/SharedValuesAssessment";
import StyleAssessment from "@/components/assessment/StyleAssessment";
import StaffAssessment from "@/components/assessment/StaffAssessment";
import SkillsAssessment from "@/components/assessment/SkillsAssessment";
import { useToast } from "@/hooks/use-toast";

export interface AssessmentData {
  strategy: any;
  structure: any;
  systems: any;
  sharedValues: any;
  style: any;
  staff: any;
  skills: any;
}

const Assessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("strategy");
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    strategy: {},
    structure: {},
    systems: {},
    sharedValues: {},
    style: {},
    staff: {},
    skills: {},
  });

  const updateAssessment = (category: keyof AssessmentData, data: any) => {
    setAssessmentData((prev) => ({
      ...prev,
      [category]: data,
    }));
  };

  const handleSubmit = () => {
    // Store in localStorage
    localStorage.setItem("assessmentData", JSON.stringify(assessmentData));
    
    toast({
      title: "Assessment completed",
      description: "Analyzing your organizational alignment...",
    });

    navigate("/dashboard");
  };

  const tabs = [
    { value: "strategy", label: "Strategy", icon: "📊" },
    { value: "structure", label: "Structure", icon: "🏢" },
    { value: "systems", label: "Systems", icon: "⚙️" },
    { value: "sharedValues", label: "Shared Values", icon: "❤️" },
    { value: "style", label: "Style", icon: "👔" },
    { value: "staff", label: "Staff", icon: "👥" },
    { value: "skills", label: "Skills", icon: "🎯" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4 max-w-6xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/profile")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">7S Assessment</h1>
            </div>
            <p className="text-muted-foreground">Phase 2: Evaluate each organizational element</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>Step 2 of 3</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/3 transition-all duration-500"></div>
          </div>
        </div>

        {/* Assessment Tabs */}
        <Card className="shadow-xl border-none">
          <CardHeader>
            <CardTitle>McKinsey 7S Framework Assessment</CardTitle>
            <CardDescription>
              Complete each section to evaluate your organization across all seven elements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-8">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex flex-col items-center gap-1 py-3"
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="text-xs">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="strategy" className="space-y-6">
                <StrategyAssessment
                  data={assessmentData.strategy}
                  onUpdate={(data) => updateAssessment("strategy", data)}
                />
              </TabsContent>

              <TabsContent value="structure" className="space-y-6">
                <StructureAssessment
                  data={assessmentData.structure}
                  onUpdate={(data) => updateAssessment("structure", data)}
                />
              </TabsContent>

              <TabsContent value="systems" className="space-y-6">
                <SystemsAssessment
                  data={assessmentData.systems}
                  onUpdate={(data) => updateAssessment("systems", data)}
                />
              </TabsContent>

              <TabsContent value="sharedValues" className="space-y-6">
                <SharedValuesAssessment
                  data={assessmentData.sharedValues}
                  onUpdate={(data) => updateAssessment("sharedValues", data)}
                />
              </TabsContent>

              <TabsContent value="style" className="space-y-6">
                <StyleAssessment
                  data={assessmentData.style}
                  onUpdate={(data) => updateAssessment("style", data)}
                />
              </TabsContent>

              <TabsContent value="staff" className="space-y-6">
                <StaffAssessment
                  data={assessmentData.staff}
                  onUpdate={(data) => updateAssessment("staff", data)}
                />
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <SkillsAssessment
                  data={assessmentData.skills}
                  onUpdate={(data) => updateAssessment("skills", data)}
                />
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = tabs.findIndex((t) => t.value === activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1].value);
                  }
                }}
                disabled={activeTab === "strategy"}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Section
              </Button>

              {activeTab === "skills" ? (
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80"
                >
                  Complete Assessment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const currentIndex = tabs.findIndex((t) => t.value === activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1].value);
                    }
                  }}
                  size="lg"
                  className="gap-2"
                >
                  Next Section
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
