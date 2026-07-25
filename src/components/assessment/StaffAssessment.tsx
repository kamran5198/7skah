import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const StaffAssessment = ({ data, onUpdate }: Props) => {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Staff Assessment</h3>
        <p className="text-muted-foreground text-sm">
          Evaluate employee satisfaction, diversity, and retention
        </p>
      </div>

      <div className="space-y-2">
        <Label>Overall Employee Satisfaction/Engagement (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.satisfaction || 5]}
            onValueChange={(value) => handleChange("satisfaction", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.satisfaction || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Very low morale, 10 = Highly engaged workforce
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="turnoverRate">Annual Turnover Rate (%)</Label>
        <Input
          id="turnoverRate"
          type="number"
          placeholder="e.g., 15"
          value={data.turnoverRate || ""}
          onChange={(e) => handleChange("turnoverRate", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Industry average is typically 10-20%
        </p>
      </div>

      <div className="space-y-2">
        <Label>Workforce Diversity (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.diversity || 5]}
            onValueChange={(value) => handleChange("diversity", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.diversity || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Homogeneous workforce, 10 = Highly diverse across dimensions
        </p>
      </div>

      <div className="space-y-2">
        <Label>Employee Value Proposition Strength (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.evpStrength || 5]}
            onValueChange={(value) => handleChange("evpStrength", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.evpStrength || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Weak employer brand, 10 = Employer of choice
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="distributionChallenges">Workforce Distribution Challenges</Label>
        <Textarea
          id="distributionChallenges"
          placeholder="Describe challenges with remote work, geographic distribution, or workforce planning..."
          value={data.distributionChallenges || ""}
          onChange={(e) => handleChange("distributionChallenges", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="retentionConcerns">Talent Retention Concerns</Label>
        <Textarea
          id="retentionConcerns"
          placeholder="What are the main reasons employees leave? Which roles are hardest to retain?"
          value={data.retentionConcerns || ""}
          onChange={(e) => handleChange("retentionConcerns", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default StaffAssessment;
