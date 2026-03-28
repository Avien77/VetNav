import {
  Heart,
  GraduationCap,
  DollarSign,
  Home,
  Briefcase,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import type { Benefit } from "../data/benefits";

const iconMap = {
  Heart,
  GraduationCap,
  DollarSign,
  Home,
  Briefcase,
};

interface BenefitCardProps {
  benefit: Benefit;
  onShowLocations: (benefitId: string) => void;
  isSelected: boolean;
}

export function BenefitCard({
  benefit,
  onShowLocations,
  isSelected,
}: BenefitCardProps) {
  const Icon = iconMap[benefit.icon as keyof typeof iconMap] || Heart;

  return (
    <div
      className={`bg-white rounded-xl p-4 md:p-6 border-2 transition-all ${
        isSelected
          ? "border-blue-600 shadow-xl"
          : "border-slate-200 shadow-md hover:shadow-lg"
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`${benefit.color} p-2 md:p-3 rounded-lg flex-shrink-0`}>
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            {benefit.name}
          </h3>
          <p className="text-base md:text-lg text-slate-600">{benefit.description}</p>
        </div>
      </div>

      <Button
        onClick={() => onShowLocations(benefit.id)}
        className={`w-full h-12 text-base md:text-lg rounded-lg ${
          isSelected
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-slate-600 hover:bg-slate-700"
        }`}
      >
        <MapPin className="w-5 h-5 mr-2" />
        Show Locations
      </Button>
    </div>
  );
}