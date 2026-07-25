import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const SkillsAssessment = ({ data, onUpdate }: Props) => {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const capabilities = [
    "Technical/Engineering",
    "Analytical/Data Science",
    "Creative/Design",
    "Leadership/Management",
    "Digital/Technology",
    "Sales/Marketing",
    "Customer Service",
    "Financial/Business",
  ];

  const skillGaps = [
    "Artificial Intelligence/Machine Learning",
    "Data Analytics",
    "Cloud Computing",
    "Cybersecurity",
    "Digital Marketing",
    "Agile/Lean Methods",
    "Change Management",
    "Strategic Thinking",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Skills Assessment</h3>
        <p className="text-muted-foreground text-sm">
          Evaluate current capabilities and skill gaps
        </p>
      </div>

      <div className="space-y-3">
        <Label>Current Capability Strengths (Select all that apply)</Label>
        <div className="grid grid-cols-2 gap-3">
          {capabilities.map((capability) => (
            <div key={capability} className="flex items-center space-x-2">
              <Checkbox
                id={capability}
                checked={data.strengths?.includes(capability) || false}
                onCheckedChange={(checked) => {
                  const current = data.strengths || [];
                  const updated = checked
                    ? [...current, capability]
                    : current.filter((c: string) => c !== capability);
                  handleChange("strengths", updated);
                }}
              />
              <label
                htmlFor={capability}
                className="text-sm text-foreground cursor-pointer"
              >
                {capability}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Critical Skill Gaps (Select all that apply)</Label>
        <div className="grid grid-cols-2 gap-3">
          {skillGaps.map((gap) => (
            <div key={gap} className="flex items-center space-x-2">
              <Checkbox
                id={gap}
                checked={data.gaps?.includes(gap) || false}
                onCheckedChange={(checked) => {
                  const current = data.gaps || [];
                  const updated = checked
                    ? [...current, gap]
                    : current.filter((g: string) => g !== gap);
                  handleChange("gaps", updated);
                }}
              />
              <label
                htmlFor={gap}
                className="text-sm text-foreground cursor-pointer"
              >
                {gap}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="trainingInvestment">Training & Development Investment (% of payroll)</Label>
        <Input
          id="trainingInvestment"
          type="number"
          placeholder="e.g., 2.5"
          value={data.trainingInvestment || ""}
          onChange={(e) => handleChange("trainingInvestment", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Industry benchmark is typically 1-3% of payroll
        </p>
      </div>

      <div className="space-y-2">
        <Label>Skills Relevance to Strategic Direction (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.relevance || 5]}
            onValueChange={(value) => handleChange("relevance", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.relevance || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Skills don't match strategy, 10 = Perfect alignment
        </p>
      </div>

      <div className="space-y-2">
        <Label>Speed of Upskilling Initiatives (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.upskillingSpeed || 5]}
            onValueChange={(value) => handleChange("upskillingSpeed", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.upskillingSpeed || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Very slow to develop new skills, 10 = Rapid capability building
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="developmentBarriers">Skill Development Barriers</Label>
        <Textarea
          id="developmentBarriers"
          placeholder="What prevents faster skill development? (budget, time, access to training, etc.)"
          value={data.barriers || ""}
          onChange={(e) => handleChange("barriers", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default SkillsAssessment;
