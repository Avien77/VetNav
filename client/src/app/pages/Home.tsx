import { useState } from "react";
import { useNavigate } from "react-router";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { BranchLogos } from "../components/BranchLogos";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Shield, MapPin, FileCheck, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

export function Home() {
  const navigate = useNavigate();
  const [branch, setBranch] = useState("");
  const [rank, setRank] = useState("");
  const [yearsServed, setYearsServed] = useState("");
  const [isActiveDuty, setIsActiveDuty] = useState<boolean | null>(null);
  
  // Active duty dates
  const [separationYear, setSeparationYear] = useState("");
  const [separationMonth, setSeparationMonth] = useState("");
  const [separationDay, setSeparationDay] = useState("");
  
  // Veteran dates
  const [enlistmentYear, setEnlistmentYear] = useState("");
  const [enlistmentMonth, setEnlistmentMonth] = useState("");
  const [dischargeYear, setDischargeYear] = useState("");
  const [dischargeMonth, setDischargeMonth] = useState("");
  
  const [hasDisability, setHasDisability] = useState(false);
  const [disabilityRating, setDisabilityRating] = useState([0]);
  const [zipCode, setZipCode] = useState("");
  const [benefitCategory, setBenefitCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store data in session storage to pass to results page
    sessionStorage.setItem(
      "vetNavData",
      JSON.stringify({
        branch,
        rank,
        yearsServed: parseInt(yearsServed) || 0,
        isActiveDuty,
        separationDate: isActiveDuty ? `${separationYear}-${separationMonth}-${separationDay}` : null,
        enlistmentDate: !isActiveDuty ? `${enlistmentYear}-${enlistmentMonth}` : null,
        dischargeDate: !isActiveDuty ? `${dischargeYear}-${dischargeMonth}` : null,
        disabilityRating: hasDisability ? disabilityRating[0] : 0,
        zipCode,
        benefitCategory,
      })
    );

    navigate("/results");
  };

  const isFormValid = branch && rank && yearsServed && zipCode && benefitCategory && isActiveDuty !== null &&
    (isActiveDuty 
      ? (separationYear && separationMonth && separationDay)
      : (enlistmentYear && enlistmentMonth && dischargeYear && dischargeMonth)
    );

  // Generate year options (current year to 80 years ago for enlistment, current year + 10 for separation)
  const currentYear = new Date().getFullYear();
  const enlistmentYears = Array.from({ length: 80 }, (_, i) => currentYear - i);
  const separationYears = Array.from({ length: 15 }, (_, i) => currentYear + i);
  
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Rank data by branch
  const ranksByBranch: Record<string, { category: string; ranks: string[] }[]> = {
    army: [
      {
        category: "Enlisted",
        ranks: ["E-1 Private", "E-2 Private", "E-3 Private First Class", "E-4 Specialist/Corporal", "E-5 Sergeant", "E-6 Staff Sergeant", "E-7 Sergeant First Class", "E-8 Master Sergeant/First Sergeant", "E-9 Sergeant Major/Command Sergeant Major"]
      },
      {
        category: "Warrant Officer",
        ranks: ["W-1 Warrant Officer 1", "W-2 Chief Warrant Officer 2", "W-3 Chief Warrant Officer 3", "W-4 Chief Warrant Officer 4", "W-5 Chief Warrant Officer 5"]
      },
      {
        category: "Officer",
        ranks: ["O-1 Second Lieutenant", "O-2 First Lieutenant", "O-3 Captain", "O-4 Major", "O-5 Lieutenant Colonel", "O-6 Colonel", "O-7 Brigadier General", "O-8 Major General", "O-9 Lieutenant General", "O-10 General"]
      }
    ],
    navy: [
      {
        category: "Enlisted",
        ranks: ["E-1 Seaman Recruit", "E-2 Seaman Apprentice", "E-3 Seaman", "E-4 Petty Officer Third Class", "E-5 Petty Officer Second Class", "E-6 Petty Officer First Class", "E-7 Chief Petty Officer", "E-8 Senior Chief Petty Officer", "E-9 Master Chief Petty Officer"]
      },
      {
        category: "Warrant Officer",
        ranks: ["W-1 Warrant Officer 1", "W-2 Chief Warrant Officer 2", "W-3 Chief Warrant Officer 3", "W-4 Chief Warrant Officer 4", "W-5 Chief Warrant Officer 5"]
      },
      {
        category: "Officer",
        ranks: ["O-1 Ensign", "O-2 Lieutenant Junior Grade", "O-3 Lieutenant", "O-4 Lieutenant Commander", "O-5 Commander", "O-6 Captain", "O-7 Rear Admiral (Lower Half)", "O-8 Rear Admiral", "O-9 Vice Admiral", "O-10 Admiral"]
      }
    ],
    "air-force": [
      {
        category: "Enlisted",
        ranks: ["E-1 Airman Basic", "E-2 Airman", "E-3 Airman First Class", "E-4 Senior Airman", "E-5 Staff Sergeant", "E-6 Technical Sergeant", "E-7 Master Sergeant", "E-8 Senior Master Sergeant", "E-9 Chief Master Sergeant"]
      },
      {
        category: "Officer",
        ranks: ["O-1 Second Lieutenant", "O-2 First Lieutenant", "O-3 Captain", "O-4 Major", "O-5 Lieutenant Colonel", "O-6 Colonel", "O-7 Brigadier General", "O-8 Major General", "O-9 Lieutenant General", "O-10 General"]
      }
    ],
    marines: [
      {
        category: "Enlisted",
        ranks: ["E-1 Private", "E-2 Private First Class", "E-3 Lance Corporal", "E-4 Corporal", "E-5 Sergeant", "E-6 Staff Sergeant", "E-7 Gunnery Sergeant", "E-8 Master Sergeant/First Sergeant", "E-9 Master Gunnery Sergeant/Sergeant Major"]
      },
      {
        category: "Warrant Officer",
        ranks: ["W-1 Warrant Officer 1", "W-2 Chief Warrant Officer 2", "W-3 Chief Warrant Officer 3", "W-4 Chief Warrant Officer 4", "W-5 Chief Warrant Officer 5"]
      },
      {
        category: "Officer",
        ranks: ["O-1 Second Lieutenant", "O-2 First Lieutenant", "O-3 Captain", "O-4 Major", "O-5 Lieutenant Colonel", "O-6 Colonel", "O-7 Brigadier General", "O-8 Major General", "O-9 Lieutenant General", "O-10 General"]
      }
    ],
    "coast-guard": [
      {
        category: "Enlisted",
        ranks: ["E-1 Seaman Recruit", "E-2 Seaman Apprentice", "E-3 Seaman", "E-4 Petty Officer Third Class", "E-5 Petty Officer Second Class", "E-6 Petty Officer First Class", "E-7 Chief Petty Officer", "E-8 Senior Chief Petty Officer", "E-9 Master Chief Petty Officer"]
      },
      {
        category: "Warrant Officer",
        ranks: ["W-2 Chief Warrant Officer 2", "W-3 Chief Warrant Officer 3", "W-4 Chief Warrant Officer 4"]
      },
      {
        category: "Officer",
        ranks: ["O-1 Ensign", "O-2 Lieutenant Junior Grade", "O-3 Lieutenant", "O-4 Lieutenant Commander", "O-5 Commander", "O-6 Captain", "O-7 Rear Admiral (Lower Half)", "O-8 Rear Admiral", "O-9 Vice Admiral", "O-10 Admiral"]
      }
    ],
    "space-force": [
      {
        category: "Enlisted",
        ranks: ["E-1 Specialist 1", "E-2 Specialist 2", "E-3 Specialist 3", "E-4 Specialist 4", "E-5 Sergeant", "E-6 Technical Sergeant", "E-7 Master Sergeant", "E-8 Senior Master Sergeant", "E-9 Chief Master Sergeant"]
      },
      {
        category: "Officer",
        ranks: ["O-1 Second Lieutenant", "O-2 First Lieutenant", "O-3 Captain", "O-4 Major", "O-5 Lieutenant Colonel", "O-6 Colonel", "O-7 Brigadier General", "O-8 Major General", "O-9 Lieutenant General", "O-10 General"]
      }
    ]
  };

  const availableRanks = branch ? ranksByBranch[branch] || [] : [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Header with Crisis Line */}
      <header className="sticky top-0 z-50 bg-[#0076AB] border-b-4 border-[#0076AB] py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Patriotic Shield */}
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Times New Roman', serif" }}>
                VetNav
              </h1>
              <p className="text-base md:text-lg text-white" style={{ fontFamily: "'Times New Roman', serif" }}>
                Find your benefits. Find where to go.
              </p>
            </div>
          </div>

          {/* Crisis Line Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white h-12 px-4 md:px-6 text-sm md:text-base font-bold shadow-lg animate-pulse"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Crisis Line
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-900">
                  You Are Not Alone
                </DialogTitle>
                <DialogDescription className="text-lg text-slate-700 pt-4">
                  If you're a veteran in crisis or concerned about one, reach out to the resources below:
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="text-lg font-bold text-slate-900 mb-2">Text for Support</p>
                  <p className="text-2xl font-bold text-blue-600">838255</p>
                  <p className="text-sm text-slate-600 mt-1">Connect to a trained counselor</p>
                </div>
                
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                  <p className="text-lg font-bold text-slate-900 mb-2">Call for Help</p>
                  <p className="text-2xl font-bold text-red-600">988 then press 1</p>
                  <p className="text-sm text-slate-600 mt-1">Veterans Crisis Line</p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                  <p className="text-lg font-bold text-slate-900 mb-2">More Resources</p>
                  <a
                    href="https://www.veteranscrisisline.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    veteranscrisisline.net
                  </a>
                </div>
                
                <p className="text-center text-slate-600 italic">
                  Help is available 24/7, 365 days a year.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Image Section */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1535738754398-da14b0594de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbWVyaWNhbiUyMGZsYWclMjB3YXZpbmd8ZW58MXx8fHwxNzc0NzE1MzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="American flag"
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Find Your Veteran Benefits
            </h2>
            <p className="text-lg md:text-xl text-slate-600">
              Answer a few quick questions to see what you qualify for.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-[#0076AB] rounded-xl">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <p className="font-bold text-white" style={{ fontFamily: "'Times New Roman', serif" }}>Secure</p>
                <p className="text-sm text-white" style={{ fontFamily: "'Times New Roman', serif" }}>Your info is safe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <p className="font-bold text-white" style={{ fontFamily: "'Times New Roman', serif" }}>Official</p>
                <p className="text-sm text-white" style={{ fontFamily: "'Times New Roman', serif" }}>VA-connected resources</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <p className="font-bold text-white" style={{ fontFamily: "'Times New Roman', serif" }}>Local</p>
                <p className="text-sm text-white" style={{ fontFamily: "'Times New Roman', serif" }}>Find nearby facilities</p>
              </div>
            </div>
          </div>

          {/* Branch Logos */}
          <BranchLogos />

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Branch of Service */}
            <div className="space-y-3">
              <Label htmlFor="branch" className="text-xl text-slate-900">
                Branch of Service
              </Label>
              <Select value={branch} onValueChange={(value) => {
                setBranch(value);
                setRank(""); // Reset rank when branch changes
              }}>
                <SelectTrigger
                  id="branch"
                  className="w-full h-14 text-lg border-2"
                >
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="army" className="text-lg py-3">
                    Army
                  </SelectItem>
                  <SelectItem value="navy" className="text-lg py-3">
                    Navy
                  </SelectItem>
                  <SelectItem value="air-force" className="text-lg py-3">
                    Air Force
                  </SelectItem>
                  <SelectItem value="marines" className="text-lg py-3">
                    Marines
                  </SelectItem>
                  <SelectItem value="coast-guard" className="text-lg py-3">
                    Coast Guard
                  </SelectItem>
                  <SelectItem value="space-force" className="text-lg py-3">
                    Space Force
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rank */}
            {branch && (
              <div className="space-y-3">
                <Label htmlFor="rank" className="text-xl text-slate-900">
                  Rank
                </Label>
                <Select value={rank} onValueChange={setRank}>
                  <SelectTrigger
                    id="rank"
                    className="w-full h-14 text-lg border-2"
                  >
                    <SelectValue placeholder="Select your rank" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRanks.map((category) => (
                      <div key={category.category} className="py-2">
                        <p className="text-sm text-slate-500 font-bold mb-1">
                          {category.category}
                        </p>
                        {category.ranks.map((rank) => (
                          <SelectItem key={rank} value={rank} className="text-lg py-3">
                            {rank}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Years Served */}
            <div className="space-y-3">
              <Label htmlFor="years" className="text-xl text-slate-900">
                Years Served
              </Label>
              <Input
                id="years"
                type="number"
                min="0"
                max="50"
                value={yearsServed}
                onChange={(e) => setYearsServed(e.target.value)}
                className="w-full h-14 text-lg border-2"
                placeholder="Enter years served"
              />
            </div>

            {/* Active Duty Status */}
            <div className="space-y-4">
              <Label className="text-xl text-slate-900">
                Are you currently on active duty?
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  onClick={() => setIsActiveDuty(true)}
                  variant={isActiveDuty === true ? "default" : "outline"}
                  className={`h-14 text-lg ${
                    isActiveDuty === true
                      ? "bg-[#0076AB] hover:bg-[#005a85] text-white"
                      : "border-2"
                  }`}
                  style={isActiveDuty === true ? { fontFamily: "'Times New Roman', serif" } : {}}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsActiveDuty(false)}
                  variant={isActiveDuty === false ? "default" : "outline"}
                  className={`h-14 text-lg ${
                    isActiveDuty === false
                      ? "bg-[#0076AB] hover:bg-[#005a85] text-white"
                      : "border-2"
                  }`}
                  style={isActiveDuty === false ? { fontFamily: "'Times New Roman', serif" } : {}}
                >
                  No
                </Button>
              </div>
            </div>

            {/* Active Duty - Expected Separation Date */}
            {isActiveDuty === true && (
              <div className="space-y-4 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                <Label className="text-xl text-slate-900">
                  Expected Separation Date
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sep-month" className="text-sm text-slate-600">Month</Label>
                    <Select value={separationMonth} onValueChange={setSeparationMonth}>
                      <SelectTrigger id="sep-month" className="h-12 text-base border-2">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value} className="text-base">
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sep-day" className="text-sm text-slate-600">Day</Label>
                    <Select value={separationDay} onValueChange={setSeparationDay}>
                      <SelectTrigger id="sep-day" className="h-12 text-base border-2">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day.toString().padStart(2, '0')} className="text-base">
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sep-year" className="text-sm text-slate-600">Year</Label>
                    <Select value={separationYear} onValueChange={setSeparationYear}>
                      <SelectTrigger id="sep-year" className="h-12 text-base border-2">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {separationYears.map((year) => (
                          <SelectItem key={year} value={year.toString()} className="text-base">
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Veteran - Enlistment and Discharge Dates */}
            {isActiveDuty === false && (
              <div className="space-y-6 p-6 bg-slate-50 rounded-xl border-2 border-slate-200">
                {/* Enlistment Date */}
                <div className="space-y-3">
                  <Label className="text-xl text-slate-900">
                    Enlistment Date
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="enlist-month" className="text-sm text-slate-600">Month</Label>
                      <Select value={enlistmentMonth} onValueChange={setEnlistmentMonth}>
                        <SelectTrigger id="enlist-month" className="h-12 text-base border-2">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value} className="text-base">
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="enlist-year" className="text-sm text-slate-600">Year</Label>
                      <Select value={enlistmentYear} onValueChange={setEnlistmentYear}>
                        <SelectTrigger id="enlist-year" className="h-12 text-base border-2">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {enlistmentYears.map((year) => (
                            <SelectItem key={year} value={year.toString()} className="text-base">
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Discharge Date */}
                <div className="space-y-3">
                  <Label className="text-xl text-slate-900">
                    Discharge Date
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="discharge-month" className="text-sm text-slate-600">Month</Label>
                      <Select value={dischargeMonth} onValueChange={setDischargeMonth}>
                        <SelectTrigger id="discharge-month" className="h-12 text-base border-2">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value} className="text-base">
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discharge-year" className="text-sm text-slate-600">Year</Label>
                      <Select value={dischargeYear} onValueChange={setDischargeYear}>
                        <SelectTrigger id="discharge-year" className="h-12 text-base border-2">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {enlistmentYears.map((year) => (
                            <SelectItem key={year} value={year.toString()} className="text-base">
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Disability Rating - Optional */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <Checkbox
                  id="has-disability"
                  checked={hasDisability}
                  onCheckedChange={(checked) => setHasDisability(checked as boolean)}
                  className="w-6 h-6"
                />
                <Label htmlFor="has-disability" className="text-xl text-slate-900 cursor-pointer">
                  I have a disability rating (if applicable)
                </Label>
              </div>
              
              {hasDisability && (
                <div className="space-y-4 pl-4 border-l-4 border-[#0076AB]">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="disability" className="text-xl text-slate-900">
                      Disability Rating (%)
                    </Label>
                    <span className="text-2xl font-bold text-[#0076AB]">
                      {disabilityRating[0]}%
                    </span>
                  </div>
                  <Slider
                    id="disability"
                    value={disabilityRating}
                    onValueChange={setDisabilityRating}
                    max={100}
                    step={10}
                    className="py-4"
                  />
                </div>
              )}
            </div>

            {/* Zip Code */}
            <div className="space-y-3">
              <Label htmlFor="zip" className="text-xl text-slate-900">
                Zip Code
              </Label>
              <Input
                id="zip"
                type="text"
                pattern="[0-9]{5}"
                maxLength={5}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full h-14 text-lg border-2"
                placeholder="Enter your zip code"
              />
            </div>

            {/* Benefit Category */}
            <div className="space-y-3">
              <Label htmlFor="benefit-category" className="text-xl text-slate-900">
                What benefits are you looking for?
              </Label>
              <Select value={benefitCategory} onValueChange={setBenefitCategory}>
                <SelectTrigger
                  id="benefit-category"
                  className="w-full h-14 text-lg border-2"
                >
                  <SelectValue placeholder="Select benefit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-lg py-3">
                    All Benefits
                  </SelectItem>
                  <SelectItem value="healthcare" className="text-lg py-3">
                    Healthcare & Medical
                  </SelectItem>
                  <SelectItem value="education" className="text-lg py-3">
                    Education & Training
                  </SelectItem>
                  <SelectItem value="housing" className="text-lg py-3">
                    Housing & Home Loans
                  </SelectItem>
                  <SelectItem value="disability" className="text-lg py-3">
                    Disability Compensation
                  </SelectItem>
                  <SelectItem value="employment" className="text-lg py-3">
                    Employment & Career
                  </SelectItem>
                  <SelectItem value="pension" className="text-lg py-3">
                    Pension & Retirement
                  </SelectItem>
                  <SelectItem value="burial" className="text-lg py-3">
                    Burial & Memorial
                  </SelectItem>
                  <SelectItem value="family" className="text-lg py-3">
                    Family & Survivor Benefits
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full h-16 text-xl bg-[#0076AB] hover:bg-[#005a85] text-white disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl shadow-lg"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              Find My Benefits
            </Button>
          </form>

          {/* Support Image */}
          <div className="mt-8 rounded-xl overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1678345201361-f070f85b62a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmFuJTIwaGFuZHNoYWtlJTIwc3VwcG9ydHxlbnwxfHx8fDE3NzQ3MTUzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Veterans support"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>

        {/* Footer with Mission Statement */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-md text-center">
          <p className="text-slate-600 mb-4">
            VetNav helps connect veterans with VA benefits and local facilities. 
            This tool is designed to simplify the benefits discovery process.
          </p>
          <p className="text-sm text-slate-500 italic">
            Providing support for our veterans with outreach focused on clarification, 
            education, and navigation in the next steps of their journey.
          </p>
        </div>
      </main>
    </div>
  );
}