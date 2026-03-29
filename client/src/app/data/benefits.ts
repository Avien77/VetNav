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
  type?: "va" | "employment" | "education" | "general";
  description?: string;
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
      type: "va",
    },
    {
      id: "va-clinic-1",
      name: "VA Community Clinic",
      address: "456 Service Blvd",
      lat: 37.7849,
      lng: -122.4094,
      benefitTypes: ["healthcare"],
      phone: "(555) 234-5678",
      type: "va",
    },
    {
      id: "edu-center",
      name: "Veterans Education Center",
      address: "789 Education Dr",
      lat: 37.7649,
      lng: -122.4294,
      benefitTypes: ["gi-bill", "vocational"],
      phone: "(555) 345-6789",
      type: "education",
    },
    {
      id: "benefit-office",
      name: "VA Benefits Office",
      address: "321 Benefits St",
      lat: 37.7949,
      lng: -122.3994,
      benefitTypes: ["disability", "home-loan", "gi-bill"],
      phone: "(555) 456-7890",
      type: "va",
    },
  ];

  return baseLocations;
};

// Get employment-specific resources by zip code
export const getEmploymentLocationsByZip = (zipCode: string, branch?: string): Location[] => {
  // Mock employment resources - in real app, would query a database
  const employmentLocations: Location[] = [
    {
      id: "vet-employment-1",
      name: "Veterans Employment Center",
      address: "100 Career Path Dr",
      lat: 37.7699,
      lng: -122.4144,
      benefitTypes: ["employment"],
      phone: "(555) 600-1000",
      type: "employment",
      description: "Resume building, interview prep, job placement assistance",
    },
    {
      id: "american-job-center-1",
      name: "American Job Center",
      address: "250 Opportunity Blvd",
      lat: 37.7799,
      lng: -122.4244,
      benefitTypes: ["employment"],
      phone: "(555) 600-2000",
      type: "employment",
      description: "Career counseling, training programs, job search resources",
    },
    {
      id: "hire-heroes-1",
      name: "Hire Heroes USA Office",
      address: "500 Service Ave",
      lat: 37.7599,
      lng: -122.4044,
      benefitTypes: ["employment"],
      phone: "(555) 600-3000",
      type: "employment",
      description: "Free career mentoring and job placement for veterans",
    },
    {
      id: "skillbridge-1",
      name: "SkillBridge Partner Hub",
      address: "75 Transition Way",
      lat: 37.7899,
      lng: -122.4344,
      benefitTypes: ["employment"],
      phone: "(555) 600-4000",
      type: "employment",
      description: "Civilian work experience for transitioning service members",
    },
    {
      id: "voc-rehab-1",
      name: "VA Vocational Rehab & Employment",
      address: "123 Veterans Way (Building 2)",
      lat: 37.7749,
      lng: -122.4194,
      benefitTypes: ["employment", "vocational"],
      phone: "(555) 600-5000",
      type: "va",
      description: "Career training for veterans with service-connected disabilities",
    },
    {
      id: "workforce-dev-1",
      name: "Veterans Workforce Development Center",
      address: "425 Career St",
      lat: 37.7549,
      lng: -122.3994,
      benefitTypes: ["employment"],
      phone: "(555) 600-6000",
      type: "employment",
      description: "Skills training, certifications, apprenticeship programs",
    },
  ];

  // If branch is provided, could add branch-specific resources
  if (branch === "coast-guard") {
    employmentLocations.push({
      id: "coast-guard-transition",
      name: "Coast Guard Career Assistance Advisor",
      address: "800 Maritime Blvd",
      lat: 37.7449,
      lng: -122.4394,
      benefitTypes: ["employment"],
      phone: "(555) 600-7000",
      type: "employment",
      description: "Coast Guard-specific transition support and employer connections",
    });
  }

  return employmentLocations;
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