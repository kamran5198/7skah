import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const StyleAssessment = ({ data, onUpdate }: Props) => {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Style (Leadership) Assessment</h3>
        <p className="text-muted-foreground text-sm">
          Evaluate leadership approach and management effectiveness
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="leadershipStyle">Dominant Leadership Style</Label>
        <Select value={data.leadershipStyle} onValueChange={(value) => handleChange("leadershipStyle", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select leadership style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="autocratic">Autocratic - Top-down decisions</SelectItem>
            <SelectItem value="democratic">Democratic - Participative</SelectItem>
            <SelectItem value="transformational">Transformational - Inspiring change</SelectItem>
            <SelectItem value="servant">Servant - Employee-first</SelectItem>
            <SelectItem value="coaching">Coaching - Development-focused</SelectItem>
            <SelectItem value="laissez-faire">Laissez-faire - Hands-off</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="decisionSpeed">Decision-Making Speed</Label>
        <Select value={data.decisionSpeed} onValueChange={(value) => handleChange("decisionSpeed", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select decision speed" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="very-slow">Very Slow - Extensive deliberation</SelectItem>
            <SelectItem value="slow">Slow - Cautious approach</SelectItem>
            <SelectItem value="moderate">Moderate - Balanced</SelectItem>
            <SelectItem value="fast">Fast - Quick decisions</SelectItem>
            <SelectItem value="very-fast">Very Fast - Rapid responses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Communication Transparency (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.transparency || 5]}
            onValueChange={(value) => handleChange("transparency", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.transparency || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Limited information sharing, 10 = Complete transparency
        </p>
      </div>

      <div className="space-y-2">
        <Label>Leadership Accessibility (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.accessibility || 5]}
            onValueChange={(value) => handleChange("accessibility", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.accessibility || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Distant leadership, 10 = Highly accessible leaders
        </p>
      </div>

      <div className="space-y-2">
        <Label>Leadership Development Investment (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.development || 5]}
            onValueChange={(value) => handleChange("development", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.development || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Minimal investment, 10 = Significant leadership development
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="leadershipTensions">Leadership Tensions or Gaps</Label>
        <Textarea
          id="leadershipTensions"
          placeholder="Describe leadership challenges, capability gaps, or style mismatches with organizational needs..."
          value={data.tensions || ""}
          onChange={(e) => handleChange("tensions", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default StyleAssessment;
