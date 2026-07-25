import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const StrategyAssessment = ({ data, onUpdate }: Props) => {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const focusAreas = [
    "Market Expansion",
    "Innovation",
    "Operational Efficiency",
    "Digital Transformation",
    "Customer Experience",
    "Cost Reduction",
    "Product Development",
    "Geographic Growth",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Strategy Assessment</h3>
        <p className="text-muted-foreground text-sm">
          Evaluate the clarity and effectiveness of your organization's strategic direction
        </p>
      </div>

      <div className="space-y-2">
        <Label>Strategic Direction Clarity (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.clarityScore || 5]}
            onValueChange={(value) => handleChange("clarityScore", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.clarityScore || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Very unclear, 10 = Crystal clear
        </p>
      </div>

      <div className="space-y-2">
        <Label>Competitive Positioning Strength (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.positioningScore || 5]}
            onValueChange={(value) => handleChange("positioningScore", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.positioningScore || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Weak positioning, 10 = Strong market position
        </p>
      </div>

      <div className="space-y-3">
        <Label>Strategic Focus Areas (Select all that apply)</Label>
        <div className="grid grid-cols-2 gap-3">
          {focusAreas.map((area) => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox
                id={area}
                checked={data.focusAreas?.includes(area) || false}
                onCheckedChange={(checked) => {
                  const current = data.focusAreas || [];
                  const updated = checked
                    ? [...current, area]
                    : current.filter((a: string) => a !== area);
                  handleChange("focusAreas", updated);
                }}
              />
              <label
                htmlFor={area}
                className="text-sm text-foreground cursor-pointer"
              >
                {area}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Strategy Communication Effectiveness (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.communicationScore || 5]}
            onValueChange={(value) => handleChange("communicationScore", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.communicationScore || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Poorly communicated, 10 = Widely understood
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="strategicTensions">Key Strategic Tensions or Conflicts</Label>
        <Textarea
          id="strategicTensions"
          placeholder="Describe any major strategic challenges, competing priorities, or areas of disagreement..."
          value={data.tensions || ""}
          onChange={(e) => handleChange("tensions", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default StrategyAssessment;
