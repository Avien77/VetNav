export interface Benefit {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirements?: {
    minYears?: number;
    minDisabilityRating?: number;
  };
}

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  benefitTypes: string[];
  phone?: string;
}

export const allBenefits: Benefit[] = [
  {
    id: "healthcare",
    name: "VA Healthcare",
    description: "Access medical services at VA hospitals and clinics.",
    icon: "Heart",
    color: "bg-blue-600",
    requirements: {},
  },
  {
    id: "gi-bill",
    name: "GI Bill",
    description: "Funding for education and training programs.",
    icon: "GraduationCap",
    color: "bg-green-600",
    requirements: {
      minYears: 2,
    },
  },
  {
    id: "disability",
    name: "Disability Compensation",
    description: "Monthly payments for service-related conditions.",
    icon: "DollarSign",
    color: "bg-red-600",
    requirements: {
      minDisabilityRating: 10,
    },
  },
  {
    id: "home-loan",
    name: "VA Home Loan",
    description: "Home loans with no down payment required.",
    icon: "Home",
    color: "bg-purple-600",
    requirements: {
      minYears: 2,
    },
  },
  {
    id: "vocational",
    name: "Vocational Rehab",
    description: "Job training and employment support services.",
    icon: "Briefcase",
    color: "bg-orange-600",
    requirements: {
      minDisabilityRating: 20,
    },
  },
];

// Mock locations for different zip code areas
export const getLocationsByZip = (zipCode: string): Location[] => {
  // Simple mock logic - in real app, would query a database
  const baseLocations: Location[] = [
    {
      id: "va-medical-1",
      name: "VA Medical Center",
      address: "123 Veterans Way",
      lat: 37.7749,
      lng: -122.4194,
      benefitTypes: ["healthcare", "disability", "vocational"],
      phone: "(555) 123-4567",
    },
    {
      id: "va-clinic-1",
      name: "VA Community Clinic",
      address: "456 Service Blvd",
      lat: 37.7849,
      lng: -122.4094,
      benefitTypes: ["healthcare"],
      phone: "(555) 234-5678",
    },
    {
      id: "edu-center",
      name: "Veterans Education Center",
      address: "789 Education Dr",
      lat: 37.7649,
      lng: -122.4294,
      benefitTypes: ["gi-bill", "vocational"],
      phone: "(555) 345-6789",
    },
    {
      id: "benefit-office",
      name: "VA Benefits Office",
      address: "321 Benefits St",
      lat: 37.7949,
      lng: -122.3994,
      benefitTypes: ["disability", "home-loan", "gi-bill"],
      phone: "(555) 456-7890",
    },
  ];

  return baseLocations;
};

export const getQualifiedBenefits = (
  yearsServed: number,
  disabilityRating: number
): Benefit[] => {
  return allBenefits.filter((benefit) => {
    if (
      benefit.requirements?.minYears &&
      yearsServed < benefit.requirements.minYears
    ) {
      return false;
    }
    if (
      benefit.requirements?.minDisabilityRating &&
      disabilityRating < benefit.requirements.minDisabilityRating
    ) {
      return false;
    }
    return true;
  });
};
