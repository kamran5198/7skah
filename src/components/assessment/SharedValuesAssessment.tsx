import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const SharedValuesAssessment = ({ data, onUpdate }: Props) => {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const addValue = () => {
    const values = data.coreValues || [];
    if (values.length < 6) {
      handleChange("coreValues", [...values, ""]);
    }
  };

  const removeValue = (index: number) => {
    const values = data.coreValues || [];
    handleChange("coreValues", values.filter((_: any, i: number) => i !== index));
  };

  const updateValue = (index: number, value: string) => {
    const values = [...(data.coreValues || [])];
    values[index] = value;
    handleChange("coreValues", values);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Shared Values Assessment</h3>
        <p className="text-muted-foreground text-sm">
          Evaluate your organization's core values and cultural identity
        </p>
      </div>

      <div className="space-y-3">
        <Label>Core Values (Up to 6)</Label>
        <div className="space-y-2">
          {(data.coreValues || []).map((value: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder={`Value ${index + 1}`}
                value={value}
                onChange={(e) => updateValue(index, e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeValue(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {(!data.coreValues || data.coreValues.length < 6) && (
            <Button
              variant="outline"
              onClick={addValue}
              className="w-full"
            >
              Add Value
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Values Embedding in Daily Operations (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.embeddingScore || 5]}
            onValueChange={(value) => handleChange("embeddingScore", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.embeddingScore || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Values are just words, 10 = Values guide every decision
        </p>
      </div>

      <div className="space-y-2">
        <Label>Cultural Identity Strength (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.identityStrength || 5]}
            onValueChange={(value) => handleChange("identityStrength", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.identityStrength || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Weak culture, 10 = Strong, distinctive culture
        </p>
      </div>

      <div className="space-y-2">
        <Label>Values Consistency Across Regions/Departments (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.consistency || 5]}
            onValueChange={(value) => handleChange("consistency", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.consistency || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Very inconsistent, 10 = Uniform across organization
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="culturalChallenges">Cultural Challenges During Growth/Change</Label>
        <Textarea
          id="culturalChallenges"
          placeholder="Describe how your culture has been affected by growth, mergers, or transformation initiatives..."
          value={data.challenges || ""}
          onChange={(e) => handleChange("challenges", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default SharedValuesAssessment;
