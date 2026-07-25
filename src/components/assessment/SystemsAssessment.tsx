import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const SystemsAssessment = ({ data, onUpdate }: Props) => {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const systemTypes = [
    "ERP (Enterprise Resource Planning)",
    "CRM (Customer Relationship Management)",
    "HRIS (Human Resources)",
    "Project Management Tools",
    "Analytics/BI Platforms",
    "Communication Tools",
    "Document Management",
    "Financial Systems",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Systems Assessment</h3>
        <p className="text-muted-foreground text-sm">
          Evaluate your technology infrastructure and operational systems
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="itMaturity">IT Infrastructure Maturity</Label>
        <Select value={data.itMaturity} onValueChange={(value) => handleChange("itMaturity", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select IT maturity level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="legacy">Legacy - Outdated systems</SelectItem>
            <SelectItem value="transitioning">Transitioning - Mix of old and new</SelectItem>
            <SelectItem value="modern">Modern - Recent technology</SelectItem>
            <SelectItem value="cutting-edge">Cutting-edge - Latest solutions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Key Systems in Use (Select all that apply)</Label>
        <div className="grid grid-cols-1 gap-3">
          {systemTypes.map((system) => (
            <div key={system} className="flex items-center space-x-2">
              <Checkbox
                id={system}
                checked={data.systems?.includes(system) || false}
                onCheckedChange={(checked) => {
                  const current = data.systems || [];
                  const updated = checked
                    ? [...current, system]
                    : current.filter((s: string) => s !== system);
                  handleChange("systems", updated);
                }}
              />
              <label
                htmlFor={system}
                className="text-sm text-foreground cursor-pointer"
              >
                {system}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="integration">Systems Integration Level</Label>
        <Select value={data.integration} onValueChange={(value) => handleChange("integration", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select integration level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="siloed">Siloed - Disconnected systems</SelectItem>
            <SelectItem value="partial">Partially Integrated - Some connections</SelectItem>
            <SelectItem value="integrated">Fully Integrated - Seamless data flow</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Data Availability for Decision-Making (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.dataAvailability || 5]}
            onValueChange={(value) => handleChange("dataAvailability", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.dataAvailability || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Limited data access, 10 = Real-time insights available
        </p>
      </div>

      <div className="space-y-2">
        <Label>Process Standardization (1-10)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.standardization || 5]}
            onValueChange={(value) => handleChange("standardization", value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-lg font-semibold text-primary w-8 text-center">
            {data.standardization || 5}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          1 = Highly variable processes, 10 = Consistent standardized processes
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bottlenecks">System-Related Bottlenecks</Label>
        <Textarea
          id="bottlenecks"
          placeholder="Describe technical limitations, integration issues, or system performance problems..."
          value={data.bottlenecks || ""}
          onChange={(e) => handleChange("bottlenecks", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default SystemsAssessment;
