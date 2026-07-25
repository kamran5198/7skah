import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyData {
  companyName: string;
  industry: string;
  headquarters: string;
  yearsInOperation: string;
  businessModel: string;
  employees: string;
  annualRevenue: string;
  revenueGrowth: string;
  marketPosition: string;
  mission: string;
  vision: string;
  strategicPriorities: string;
  majorChallenge: string;
  budget: string;
  financialHealth: string;
}

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<CompanyData>({
    companyName: "",
    industry: "",
    headquarters: "",
    yearsInOperation: "",
    businessModel: "",
    employees: "",
    annualRevenue: "",
    revenueGrowth: "",
    marketPosition: "",
    mission: "",
    vision: "",
    strategicPriorities: "",
    majorChallenge: "",
    budget: "",
    financialHealth: "",
  });

  const handleChange = (field: keyof CompanyData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.companyName || !formData.industry || !formData.budget) {
      toast({
        title: "Required fields missing",
        description: "Please fill in at least company name, industry, and budget to continue.",
        variant: "destructive",
      });
      return;
    }

    // Store in localStorage for now
    localStorage.setItem("companyProfile", JSON.stringify(formData));
    
    toast({
      title: "Profile saved successfully",
      description: "Moving to 7S assessment...",
    });

    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4 max-w-4xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Company Profile</h1>
            </div>
            <p className="text-muted-foreground">Phase 1: Tell us about your organization</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>Step 1 of 3</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/3 transition-all duration-500"></div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Organization Identification */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>Organization Identification</CardTitle>
              <CardDescription>Basic information about your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry Sector *</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="headquarters">Headquarters Location</Label>
                  <Input
                    id="headquarters"
                    placeholder="City, Country"
                    value={formData.headquarters}
                    onChange={(e) => handleChange("headquarters", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsInOperation">Years in Operation</Label>
                  <Input
                    id="yearsInOperation"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.yearsInOperation}
                    onChange={(e) => handleChange("yearsInOperation", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessModel">Primary Business Model</Label>
                <Select value={formData.businessModel} onValueChange={(value) => handleChange("businessModel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b2b">B2B (Business to Business)</SelectItem>
                    <SelectItem value="b2c">B2C (Business to Consumer)</SelectItem>
                    <SelectItem value="b2g">B2G (Business to Government)</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Organizational Scale */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>Organizational Scale</CardTitle>
              <CardDescription>Size and financial metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employees">Total Employees</Label>
                  <Input
                    id="employees"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.employees}
                    onChange={(e) => handleChange("employees", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualRevenue">Annual Revenue (USD)</Label>
                  <Input
                    id="annualRevenue"
                    placeholder="e.g., 50000000"
                    value={formData.annualRevenue}
                    onChange={(e) => handleChange("annualRevenue", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenueGrowth">Revenue Growth (Past 3 Years)</Label>
                  <Select value={formData.revenueGrowth} onValueChange={(value) => handleChange("revenueGrowth", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select growth trend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="declining">Declining</SelectItem>
                      <SelectItem value="flat">Flat (0-5%)</SelectItem>
                      <SelectItem value="moderate">Moderate (5-15%)</SelectItem>
                      <SelectItem value="strong">Strong (15-30%)</SelectItem>
                      <SelectItem value="rapid">Rapid (30%+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marketPosition">Market Position</Label>
                  <Select value={formData.marketPosition} onValueChange={(value) => handleChange("marketPosition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leader">Market Leader</SelectItem>
                      <SelectItem value="challenger">Challenger</SelectItem>
                      <SelectItem value="nicher">Nicher</SelectItem>
                      <SelectItem value="follower">Follower</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategic Context */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>Strategic Context</CardTitle>
              <CardDescription>Vision, mission, and current challenges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  placeholder="What is your organization's purpose? (500 characters max)"
                  value={formData.mission}
                  onChange={(e) => handleChange("mission", e.target.value)}
                  maxLength={500}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vision">Vision Statement</Label>
                <Textarea
                  id="vision"
                  placeholder="Where do you want to be in the future? (500 characters max)"
                  value={formData.vision}
                  onChange={(e) => handleChange("vision", e.target.value)}
                  maxLength={500}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="strategicPriorities">Top 3 Strategic Priorities (Next 2-3 Years)</Label>
                <Textarea
                  id="strategicPriorities"
                  placeholder="List your key strategic priorities, one per line"
                  value={formData.strategicPriorities}
                  onChange={(e) => handleChange("strategicPriorities", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="majorChallenge">Current Major Challenge or Transformation Initiative</Label>
                <Textarea
                  id="majorChallenge"
                  placeholder="Describe the biggest challenge or change initiative your organization is facing"
                  value={formData.majorChallenge}
                  onChange={(e) => handleChange("majorChallenge", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Parameters */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>Financial Parameters</CardTitle>
              <CardDescription>Budget available for organizational improvements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Available Budget for Improvements (USD) *</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 1000000"
                    value={formData.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This budget will be used throughout the simulation for organizational interventions
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="financialHealth">Financial Health Indicator</Label>
                  <Select value={formData.financialHealth} onValueChange={(value) => handleChange("financialHealth", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select financial health" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthy">Healthy - Strong cash position</SelectItem>
                      <SelectItem value="moderate">Moderate Pressure - Managing carefully</SelectItem>
                      <SelectItem value="constrained">Significant Constraints - Limited resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Welcome
            </Button>
            <Button
              onClick={handleSubmit}
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-primary/80"
            >
              Continue to Assessment
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
