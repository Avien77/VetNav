import { Button } from "../components/ui/button";
import { ArrowLeft, Briefcase, GraduationCap, MapPin, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useState, useEffect } from "react";

export function EmploymentPath() {
  const navigate = useNavigate();
  const [currentSituation, setCurrentSituation] = useState("");
  const [workInterest, setWorkInterest] = useState("");
  const [militaryRole, setMilitaryRole] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [translatedExperience, setTranslatedExperience] = useState("");
  
  // Veteran data from home page
  const [veteranData, setVeteranData] = useState<{
    branch?: string;
    zipCode?: string;
    isActiveDuty?: boolean;
  }>({});

  // Load veteran data from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem("vetNavData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setVeteranData({
        branch: data.branch,
        zipCode: data.zipCode,
        isActiveDuty: data.isActiveDuty,
      });
    }
  }, []);

  // Get branch display name
  const getBranchName = (branch?: string) => {
    const branchNames: Record<string, string> = {
      "army": "Army",
      "navy": "Navy",
      "air-force": "Air Force",
      "marines": "Marines",
      "coast-guard": "Coast Guard",
      "space-force": "Space Force",
    };
    return branch ? branchNames[branch] || branch : "";
  };

  // Job matching logic based on military role and work interest
  const getJobMatches = () => {
    // Only return results if military role is provided
    if (!militaryRole || militaryRole.trim() === "") {
      return ["Please enter your military role above to see personalized job matches"];
    }

    const jobs: Record<string, string[]> = {
      // Common military roles
      "boatswain": ["Operations Manager", "Logistics Coordinator", "Maritime Operations Specialist"],
      "mate": ["Operations Manager", "Logistics Coordinator", "Maritime Operations Specialist"],
      "infantry": ["Security Manager", "Operations Coordinator", "Law Enforcement Officer"],
      "logistics": ["Supply Chain Manager", "Logistics Coordinator", "Warehouse Manager"],
      "supply": ["Supply Chain Manager", "Logistics Coordinator", "Inventory Manager"],
      "medic": ["Emergency Medical Technician", "Healthcare Administrator", "Patient Care Coordinator"],
      "corpsman": ["Emergency Medical Technician", "Healthcare Administrator", "Patient Care Coordinator"],
      "medical": ["Healthcare Administrator", "Medical Office Manager", "Patient Care Coordinator"],
      "mechanic": ["Maintenance Supervisor", "Equipment Manager", "Automotive Technician"],
      "maintenance": ["Maintenance Supervisor", "Facilities Manager", "Equipment Technician"],
      "aviation": ["Aviation Maintenance Technician", "Air Traffic Controller", "Operations Manager"],
      "aircraft": ["Aviation Maintenance Technician", "Aerospace Technician", "Quality Control Inspector"],
      "pilot": ["Commercial Pilot", "Aviation Operations Manager", "Flight Instructor"],
      "intelligence": ["Data Analyst", "Security Analyst", "Intelligence Specialist"],
      "analyst": ["Data Analyst", "Business Intelligence Analyst", "Research Analyst"],
      "communications": ["Network Administrator", "IT Specialist", "Communications Manager"],
      "radio": ["Communications Specialist", "Telecommunications Technician", "Network Technician"],
      "signal": ["Network Administrator", "Communications Systems Manager", "IT Specialist"],
      "engineer": ["Project Manager", "Civil Engineer", "Construction Manager"],
      "construction": ["Construction Manager", "Project Manager", "Site Supervisor"],
      "admin": ["Office Manager", "Administrative Coordinator", "Executive Assistant"],
      "clerk": ["Office Administrator", "Records Manager", "Administrative Specialist"],
      "personnel": ["Human Resources Specialist", "Talent Acquisition Manager", "HR Coordinator"],
      "electric": ["Electrician", "Electrical Technician", "Maintenance Electrician"],
      "electronics": ["Electronics Technician", "Electrical Systems Specialist", "Instrumentation Technician"],
      "technician": ["Technical Specialist", "Equipment Technician", "Systems Technician"],
      "cyber": ["Cybersecurity Analyst", "Information Security Specialist", "Network Security Engineer"],
      "security": ["Security Manager", "Information Security Analyst", "Physical Security Specialist"],
      "law enforcement": ["Law Enforcement Officer", "Security Manager", "Criminal Investigator"],
      "military police": ["Law Enforcement Officer", "Security Director", "Corrections Officer"],
      "mp": ["Law Enforcement Officer", "Security Manager", "Loss Prevention Specialist"],
      "motor": ["Fleet Manager", "Transportation Coordinator", "Automotive Service Manager"],
      "transport": ["Transportation Manager", "Logistics Coordinator", "Distribution Manager"],
      "driver": ["Commercial Driver", "Transportation Coordinator", "Fleet Operations Manager"],
      "culinary": ["Chef", "Food Service Manager", "Restaurant Manager"],
      "cook": ["Chef", "Kitchen Manager", "Food Service Supervisor"],
      "food service": ["Food Service Manager", "Catering Manager", "Hospitality Manager"],
      "fire": ["Firefighter", "Fire Inspector", "Emergency Management Specialist"],
      "combat": ["Law Enforcement Officer", "Security Specialist", "Emergency Response Coordinator"],
      "special operations": ["Emergency Response Coordinator", "Security Consultant", "Training Specialist"],
      "explosive": ["Safety Specialist", "Hazardous Materials Technician", "EOD Technician"],
      "dental": ["Dental Assistant", "Dental Office Manager", "Healthcare Administrator"],
      "imagery": ["Geospatial Analyst", "Remote Sensing Specialist", "GIS Technician"],
      "weather": ["Meteorologist", "Environmental Analyst", "Weather Forecaster"],
      "chaplain": ["Counselor", "Social Worker", "Nonprofit Program Director"],
      "legal": ["Paralegal", "Legal Assistant", "Compliance Officer"],
      "finance": ["Financial Analyst", "Accounting Specialist", "Budget Analyst"],
      "contracting": ["Contract Specialist", "Procurement Manager", "Purchasing Agent"],
      "public affairs": ["Public Relations Specialist", "Communications Manager", "Media Relations Coordinator"],
    };

    // Find matching jobs based on military role
    const roleLower = militaryRole.toLowerCase();
    let matchedJobs: string[] = [];

    // Check for keyword matches
    for (const [key, jobList] of Object.entries(jobs)) {
      if (roleLower.includes(key)) {
        matchedJobs = jobList;
        break;
      }
    }

    // If no match found, return a helpful message
    if (matchedJobs.length === 0) {
      return [`We couldn't find specific matches for "${militaryRole}". Try describing your role differently (e.g., what tasks you did, equipment you used)`];
    }

    return matchedJobs;
  };

  // Get major suggestions for school path
  const getMajorSuggestions = () => {
    // Only return results if military role is provided
    if (!militaryRole || militaryRole.trim() === "") {
      return ["Please enter your military role above to see personalized major suggestions"];
    }

    const majors: Record<string, string[]> = {
      // Common military roles mapped to college majors
      "boatswain": ["Marine Engineering", "Logistics & Supply Chain Management", "Business Management"],
      "mate": ["Marine Engineering", "Logistics & Supply Chain Management", "Business Management"],
      "infantry": ["Criminal Justice", "Emergency Management", "Public Administration"],
      "logistics": ["Supply Chain Management", "Business Administration", "Operations Management"],
      "supply": ["Supply Chain Management", "Business Administration", "Operations Management"],
      "medic": ["Nursing", "Healthcare Administration", "Emergency Medical Services"],
      "corpsman": ["Nursing", "Healthcare Administration", "Pre-Medicine"],
      "medical": ["Healthcare Administration", "Nursing", "Health Sciences"],
      "mechanic": ["Mechanical Engineering", "Automotive Technology", "Industrial Technology"],
      "maintenance": ["Facilities Management", "Industrial Technology", "Engineering Technology"],
      "aviation": ["Aviation Management", "Aerospace Engineering", "Aviation Maintenance Technology"],
      "aircraft": ["Aerospace Engineering", "Aviation Technology", "Mechanical Engineering"],
      "pilot": ["Aviation Management", "Aerospace Engineering", "Professional Pilot"],
      "intelligence": ["Data Science", "Computer Science", "Cybersecurity"],
      "analyst": ["Data Analytics", "Business Intelligence", "Information Systems"],
      "communications": ["Information Technology", "Computer Networking", "Telecommunications"],
      "radio": ["Telecommunications", "Electronics Technology", "Communications"],
      "signal": ["Information Technology", "Computer Science", "Network Engineering"],
      "engineer": ["Civil Engineering", "Project Management", "Construction Management"],
      "construction": ["Construction Management", "Civil Engineering", "Architecture"],
      "admin": ["Business Administration", "Human Resources", "Public Administration"],
      "clerk": ["Business Administration", "Information Management", "Office Administration"],
      "personnel": ["Human Resources Management", "Organizational Psychology", "Business Administration"],
      "electric": ["Electrical Engineering", "Electrical Technology", "Power Systems Engineering"],
      "electronics": ["Electronics Engineering Technology", "Electrical Engineering", "Computer Engineering"],
      "technician": ["Engineering Technology", "Applied Science", "Technical Management"],
      "cyber": ["Cybersecurity", "Computer Science", "Information Security"],
      "security": ["Cybersecurity", "Information Security", "Criminal Justice"],
      "law enforcement": ["Criminal Justice", "Criminology", "Public Safety Administration"],
      "military police": ["Criminal Justice", "Law Enforcement", "Forensic Science"],
      "mp": ["Criminal Justice", "Homeland Security", "Public Safety"],
      "motor": ["Automotive Technology", "Business Management", "Transportation & Logistics"],
      "transport": ["Transportation Management", "Logistics", "Business Administration"],
      "driver": ["Transportation & Logistics", "Business Management", "Supply Chain Management"],
      "culinary": ["Culinary Arts", "Hospitality Management", "Food Service Management"],
      "cook": ["Culinary Arts", "Restaurant Management", "Hospitality"],
      "food service": ["Hospitality Management", "Food Service Management", "Business Administration"],
      "fire": ["Fire Science", "Emergency Management", "Public Safety Administration"],
      "combat": ["Emergency Management", "Homeland Security", "Public Safety"],
      "special operations": ["Emergency Management", "Strategic Studies", "Leadership Studies"],
      "explosive": ["Safety Management", "Hazardous Materials Management", "Emergency Management"],
      "dental": ["Dental Hygiene", "Healthcare Administration", "Pre-Dentistry"],
      "imagery": ["Geospatial Science", "Geographic Information Systems", "Remote Sensing"],
      "weather": ["Meteorology", "Atmospheric Science", "Environmental Science"],
      "chaplain": ["Counseling", "Social Work", "Theology"],
      "legal": ["Legal Studies", "Paralegal Studies", "Pre-Law"],
      "finance": ["Finance", "Accounting", "Business Administration"],
      "contracting": ["Business Administration", "Procurement Management", "Contract Management"],
      "public affairs": ["Public Relations", "Communications", "Journalism"],
    };

    // Find matching majors based on military role
    const roleLower = militaryRole.toLowerCase();
    let matchedMajors: string[] = [];

    // Check for keyword matches
    for (const [key, majorList] of Object.entries(majors)) {
      if (roleLower.includes(key)) {
        matchedMajors = majorList;
        break;
      }
    }

    // If no match found, return a helpful message
    if (matchedMajors.length === 0) {
      return [`We couldn't find specific matches for "${militaryRole}". Try describing your role differently (e.g., what tasks you did, equipment you used)`];
    }

    return matchedMajors;
  };

  // Get recommended programs based on situation
  const getRecommendedPrograms = () => {
    const programs: { name: string; description: string }[] = [];

    if (currentSituation === "transitioning") {
      programs.push({
        name: "SkillBridge",
        description: "Gain civilian work experience before leaving service."
      });
      programs.push({
        name: "VA Career Counseling",
        description: "Free personalized career guidance and planning."
      });
    } else if (currentSituation === "looking") {
      programs.push({
        name: "Veteran Employment Services",
        description: "Resume help, job search, and interview prep."
      });
      programs.push({
        name: "Hire Heroes USA",
        description: "Free career mentoring and job placement."
      });
    } else if (currentSituation === "school") {
      programs.push({
        name: "GI Bill",
        description: "Pay for college, trade school, or certification programs."
      });
      programs.push({
        name: "VR&E (Chapter 31)",
        description: "Career training for veterans with service-connected disabilities."
      });
    } else {
      programs.push({
        name: "VA Career Counseling",
        description: "Free personalized career guidance and planning."
      });
      programs.push({
        name: "American Job Centers",
        description: "Local resources for job search and career exploration."
      });
    }

    return programs.slice(0, 3);
  };

  // Get next step recommendation
  const getNextStep = () => {
    if (currentSituation === "transitioning") {
      return "Start your SkillBridge application or connect with a career counselor.";
    } else if (currentSituation === "looking") {
      return "Update your resume with civilian terms and register with Veteran Employment Services.";
    } else if (currentSituation === "school") {
      return "Check your GI Bill eligibility and explore training programs.";
    } else {
      return "Schedule a free career counseling session to explore your options.";
    }
  };

  // Translate military experience
  const translateExperience = () => {
    const translations: Record<string, string> = {
      "boatswain's mate": "Managed maritime equipment, led teams, coordinated logistics, ensured safety compliance, supervised operations.",
      "infantry": "Led teams in high-pressure situations, managed personnel, coordinated operations, maintained equipment, ensured mission success.",
      "logistics": "Managed supply chains, coordinated transportation, tracked inventory, optimized processes, led logistics teams.",
      "medic": "Provided emergency medical care, managed patient records, coordinated with healthcare teams, maintained medical equipment.",
      "mechanic": "Diagnosed and repaired equipment, managed maintenance schedules, led technical teams, ensured operational readiness.",
      "aviation": "Maintained aircraft systems, managed technical operations, ensured safety compliance, led maintenance teams.",
      "intelligence": "Analyzed complex data, prepared detailed reports, briefed leadership, managed sensitive information.",
      "communications": "Managed communication systems, troubleshot technical issues, coordinated network operations, ensured system security.",
      "engineer": "Managed construction projects, led technical teams, ensured quality standards, coordinated resources.",
      "admin": "Managed office operations, coordinated schedules, handled sensitive documents, supported leadership.",
    };

    const roleLower = militaryRole.toLowerCase();
    let translation = "";

    for (const [key, desc] of Object.entries(translations)) {
      if (roleLower.includes(key)) {
        translation = desc;
        break;
      }
    }

    if (!translation) {
      translation = "Led teams, managed operations, solved complex problems, maintained high standards, worked under pressure.";
    }

    setTranslatedExperience(translation);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    if (militaryRole) {
      translateExperience();
    }
  };

  const isFormValid = currentSituation && workInterest;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#0076AB] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/")}
              className="bg-white/20 hover:bg-white/30 text-white h-12 px-6"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#0076AB] mb-8 text-center"
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            Guided Employment Path
          </h1>

          {!showResults ? (
            <>
              <p className="text-xl text-slate-600 text-center mb-12">
                Answer a few simple questions to find your career path.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Question 1 */}
                <div className="space-y-4 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <Label htmlFor="situation" className="text-2xl text-slate-900 block">
                    What best describes you right now?
                  </Label>
                  <Select value={currentSituation} onValueChange={setCurrentSituation}>
                    <SelectTrigger
                      id="situation"
                      className="w-full h-14 text-lg border-2"
                    >
                      <SelectValue placeholder="Select your situation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="looking" className="text-lg py-3">
                        Looking for a job
                      </SelectItem>
                      <SelectItem value="school" className="text-lg py-3">
                        Want to go to school
                      </SelectItem>
                      <SelectItem value="transitioning" className="text-lg py-3">
                        Transitioning out of military
                      </SelectItem>
                      <SelectItem value="unsure" className="text-lg py-3">
                        Not sure
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Question 2 */}
                <div className="space-y-4 p-6 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <Label htmlFor="interest" className="text-2xl text-slate-900 block">
                    What kind of work are you interested in?
                  </Label>
                  <Select value={workInterest} onValueChange={setWorkInterest}>
                    <SelectTrigger
                      id="interest"
                      className="w-full h-14 text-lg border-2"
                    >
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hands-on" className="text-lg py-3">
                        Hands-on / trade
                      </SelectItem>
                      <SelectItem value="office" className="text-lg py-3">
                        Office / business
                      </SelectItem>
                      <SelectItem value="technology" className="text-lg py-3">
                        Technology
                      </SelectItem>
                      <SelectItem value="unsure" className="text-lg py-3">
                        Unsure
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Question 3 - Optional */}
                <div className="space-y-4 p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="military-role" className="text-2xl text-slate-900">
                      What did you do in the military?
                    </Label>
                    <span className="text-sm text-slate-500 italic">(optional but helpful)</span>
                  </div>
                  <Input
                    id="military-role"
                    type="text"
                    value={militaryRole}
                    onChange={(e) => setMilitaryRole(e.target.value)}
                    className="w-full h-14 text-lg border-2"
                    placeholder="e.g., Boatswain's Mate, Infantry, Mechanic"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full h-16 text-xl bg-[#0076AB] hover:bg-[#005a85] text-white disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl shadow-lg"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  Get Career Plan
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Results Section */}
              <div className="space-y-8">
                {/* Veteran Context Info */}
                {(veteranData.branch || veteranData.zipCode) && (
                  <div className="bg-[#0076AB] text-white rounded-xl p-6 border-2 border-[#005a85]">
                    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Times New Roman', serif" }}>
                      Your Information:
                    </h3>
                    <div className="flex flex-wrap gap-4 text-lg">
                      {veteranData.branch && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Branch:</span>
                          <span>{getBranchName(veteranData.branch)}</span>
                        </div>
                      )}
                      {veteranData.zipCode && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          <span className="font-semibold">Location:</span>
                          <span>{veteranData.zipCode}</span>
                        </div>
                      )}
                      {veteranData.isActiveDuty !== undefined && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Status:</span>
                          <span>{veteranData.isActiveDuty ? "Active Duty" : "Veteran"}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm mt-3 italic opacity-90">
                      Resources below are tailored for {getBranchName(veteranData.branch)} {veteranData.isActiveDuty ? "service members" : "veterans"} in the {veteranData.zipCode} area
                    </p>
                  </div>
                )}

                {/* Job Matches */}
                <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-6">
                    {currentSituation === "school" ? (
                      <GraduationCap className="w-8 h-8 text-[#0076AB]" />
                    ) : (
                      <Briefcase className="w-8 h-8 text-[#0076AB]" />
                    )}
                    <h2 className="text-3xl font-bold text-slate-900">
                      {currentSituation === "school" ? "Potential Majors to Consider:" : "You Could Work As:"}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {(currentSituation === "school" ? getMajorSuggestions() : getJobMatches()).map((item, index) => (
                      <li key={index} className="text-xl text-slate-700 flex items-start gap-2">
                        <span className="text-[#0076AB] font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional section for "unsure" - show majors too */}
                {currentSituation === "unsure" && (
                  <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="w-8 h-8 text-green-700" />
                      <h2 className="text-3xl font-bold text-slate-900">
                        Potential Majors to Consider:
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {getMajorSuggestions().map((item, index) => (
                        <li key={index} className="text-xl text-slate-700 flex items-start gap-2">
                          <span className="text-green-700 font-bold">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Translated Experience */}
                {translatedExperience && (
                  <div className="bg-purple-50 rounded-xl p-8 border-2 border-purple-200">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Your Experience in Civilian Terms:
                    </h3>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {translatedExperience}
                    </p>
                    <p className="text-sm text-slate-500 mt-4 italic">
                      💡 Use this language on your resume and in interviews
                    </p>
                  </div>
                )}

                {/* Recommended Programs */}
                <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-8 h-8 text-green-700" />
                    <h2 className="text-3xl font-bold text-slate-900">
                      Recommended Programs:
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {getRecommendedPrograms().map((program, index) => (
                      <div key={index} className="border-l-4 border-green-600 pl-4">
                        <h3 className="text-xl font-bold text-slate-900">
                          {program.name}
                        </h3>
                        <p className="text-lg text-slate-700">
                          {program.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Step - Most Important */}
                <div className="bg-yellow-50 rounded-xl p-8 border-4 border-yellow-400 shadow-xl">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                    🚀 Best Next Step:
                  </h2>
                  <p className="text-2xl text-slate-700 text-center font-semibold">
                    {getNextStep()}
                  </p>
                </div>

                {/* Action Buttons Based on Selection */}
                {currentSituation === "looking" || currentSituation === "transitioning" ? (
                  <div className="bg-white rounded-xl p-8 border-2 border-slate-300">
                    <a
                      href="https://vacareers.va.gov/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        className="w-full h-16 text-xl bg-[#0076AB] hover:bg-[#005a85] text-white rounded-xl shadow-lg"
                        style={{ fontFamily: "'Times New Roman', serif" }}
                      >
                        <Briefcase className="w-6 h-6 mr-3" />
                        Apply for Jobs Near You
                        <ExternalLink className="w-5 h-5 ml-3" />
                      </Button>
                    </a>
                    <p className="text-center text-slate-600 mt-4 text-lg">
                      Search and apply for career opportunities through the VA
                    </p>
                  </div>
                ) : currentSituation === "school" ? (
                  <div className="bg-white rounded-xl p-8 border-2 border-slate-300 space-y-6">
                    {/* Educational Resource Descriptions */}
                    <div className="space-y-6 mb-6">
                      <div className="border-l-4 border-[#0076AB] pl-4">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          DANTES (Defense Activity for Non-Traditional Education Support)
                        </h3>
                        <p className="text-lg text-slate-700 leading-relaxed">
                          DANTES helps service members and veterans earn college credit and certifications by covering the cost of certain exams and testing programs. Instead of taking full classes, you can pass exams like CLEP or DSST to show what you already know and get credit faster, saving both time and money on your education.
                        </p>
                      </div>

                      <div className="border-l-4 border-[#0076AB] pl-4">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          VA College Comparison Tool
                        </h3>
                        <p className="text-lg text-slate-700 leading-relaxed">
                          The VA College Comparison Tool lets you search and compare schools to find the best option for your goals. It shows important details like tuition costs, housing allowance, graduation rates, and whether a school is approved for GI Bill benefits, helping you make a confident decision without digging through multiple websites.
                        </p>
                      </div>
                    </div>

                    <a
                      href="https://dhra.appianportalsgov.com/DoD-MOU/page/ta-decide"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        className="w-full h-16 text-xl bg-[#0076AB] hover:bg-[#005a85] text-white rounded-xl shadow-lg"
                        style={{ fontFamily: "'Times New Roman', serif" }}
                      >
                        <GraduationCap className="w-6 h-6 mr-3" />
                        Search Nearby Colleges and Universities Near You
                        <ExternalLink className="w-5 h-5 ml-3" />
                      </Button>
                    </a>
                  </div>
                ) : currentSituation === "unsure" ? (
                  <div className="bg-white rounded-xl p-8 border-2 border-slate-300">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                      Your Available Options
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Briefcase className="w-7 h-7 text-[#0076AB]" />
                          <h3 className="text-2xl font-bold text-slate-900">
                            Work / Career Path
                          </h3>
                        </div>
                        <p className="text-lg text-slate-700 leading-relaxed">
                          Jump into a civilian career using your military skills. You can find jobs that match your experience, get help with resumes and interviews, and connect with employers who value veterans. Many jobs offer good pay and benefits right away.
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                        <div className="flex items-center gap-3 mb-3">
                          <GraduationCap className="w-7 h-7 text-green-700" />
                          <h3 className="text-2xl font-bold text-slate-900">
                            Education / School Path
                          </h3>
                        </div>
                        <p className="text-lg text-slate-700 leading-relaxed">
                          Go to college, trade school, or get certifications to build new skills. Your GI Bill can cover tuition, books, and even give you a monthly housing allowance while you study. This opens doors to careers that require specific training or degrees.
                        </p>
                      </div>

                      <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">💡</span>
                          <h3 className="text-2xl font-bold text-slate-900">
                            Combination Approach
                          </h3>
                        </div>
                        <p className="text-lg text-slate-700 leading-relaxed">
                          You don't have to choose just one! Many veterans work part-time while going to school, or start working and then use their benefits for training later. Career counseling (free through VA) can help you figure out the best path for your situation.
                        </p>
                      </div>

                      <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-300">
                        <p className="text-xl text-slate-700 text-center font-semibold">
                          💬 Tip: Talk to a VA Career Counselor for free. They'll help you explore what fits your goals and situation best.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Start Over Button */}
                <div className="text-center">
                  <Button
                    onClick={() => {
                      setShowResults(false);
                      setCurrentSituation("");
                      setWorkInterest("");
                      setMilitaryRole("");
                      setTranslatedExperience("");
                    }}
                    variant="outline"
                    className="h-12 px-8 text-lg border-2"
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}