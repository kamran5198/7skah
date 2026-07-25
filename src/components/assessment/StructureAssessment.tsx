import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const StructureAssessment = ({ data, onUpdate }: Props) => {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Structure Assessment</h3>
        <p className="text-muted-foreground text-sm">
          Evaluate your organizational design and decision-making processes
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="orgDesign">Organizational Design Type</Label>
        <Select value={data.orgDesign} onValueChange={(value) => handleChange("orgDesign", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select organizational design" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hierarchical">Hierarchical</SelectItem>
            <SelectItem value="matrix">Matrix</SelectItem>
            <SelectItem value="flat">Flat</SelectItem>
            <SelectItem value="networked">Networked</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="decisionMaking">Decision-Making Approach</Label>
        <Select value={data.decisionMaking} onValueChange={(value) => handleChange("decisionMaking", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select decision-making approach" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="centralized">Centralized</SelectItem>
            <SelectItem value="decentralized">Decentralized</SelectItem>
            <SelectItem value="distributed">Distributed</SelectItem>
            <SelectItem value="mixed">Mixed/Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Cross-Functional Collaboration Quality (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.collaborationScore || 5]}
            onValueChange={(value) => handleChange("collaborationScore", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.collaborationScore || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Poor collaboration, 10 = Excellent teamwork across functions
        </p>
      </div>

      <div className="space-y-2">
        <Label>Reporting Line Clarity (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.reportingClarity || 5]}
            onValueChange={(value) => handleChange("reportingClarity", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.reportingClarity || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Confusing reporting structure, 10 = Very clear accountability
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="painPoints">Structural Pain Points</Label>
        <Textarea
          id="painPoints"
          placeholder="Describe bottlenecks, silos, unclear roles, or other structural challenges..."
          value={data.painPoints || ""}
          onChange={(e) => handleChange("painPoints", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default StructureAssessment;
