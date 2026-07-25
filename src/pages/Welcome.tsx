import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, TrendingUp, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light to-accent-light">
      <div className="container mx-auto px-4 py-12 animate-fade-in">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-accent font-medium text-sm mb-6">
            Designed by Dr. Kamran Hameed
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            McKinsey 7S Framework
            <span className="block text-primary mt-2">Organizational Alignment Simulation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Master strategic decision-making through an interactive simulation that teaches you how to diagnose 
            and resolve organizational misalignments using the proven McKinsey 7S Framework.
          </p>
        </header>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow animate-slide-up">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Diagnose Misalignments</h3>
              <p className="text-muted-foreground text-sm">
                Identify tensions across Strategy, Structure, Systems, and more with AI-powered analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Make Strategic Decisions</h3>
              <p className="text-muted-foreground text-sm">
                Navigate budget constraints and prioritize interventions with real-world trade-offs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">See Cascading Effects</h3>
              <p className="text-muted-foreground text-sm">
                Watch how your decisions ripple through the organization with immediate feedback.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Learn From Experience</h3>
              <p className="text-muted-foreground text-sm">
                Receive personalized insights and recommendations based on your decision-making approach.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Learn */}
        <Card className="border-none shadow-xl mb-12 animate-scale-in">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-xs font-bold">1</span>
                  </div>
                  <p className="text-foreground">Diagnose organizational misalignments using the 7S framework</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-xs font-bold">2</span>
                  </div>
                  <p className="text-foreground">Prioritize interventions based on impact and urgency</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-xs font-bold">3</span>
                  </div>
                  <p className="text-foreground">Understand interdependencies between organizational elements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-xs font-bold">4</span>
                  </div>
                  <p className="text-foreground">Make strategic trade-offs under resource constraints</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-xs font-bold">5</span>
                  </div>
                  <p className="text-foreground">Anticipate unintended consequences of organizational changes</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-xs font-bold">6</span>
                  </div>
                  <p className="text-foreground">Balance short-term needs with long-term strategic goals</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-xs font-bold">7</span>
                  </div>
                  <p className="text-foreground">Think systemically about organizational transformation</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-xs font-bold">8</span>
                  </div>
                  <p className="text-foreground">Appreciate the complexity of leading change initiatives</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-xs font-bold">9</span>
                  </div>
                  <p className="text-foreground">Apply learnings to your own organizational context</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-xs font-bold">10</span>
                  </div>
                  <p className="text-foreground">Develop strategic decision-making confidence</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate("/profile")}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          >
            Begin Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            Expected completion time: 45-90 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
