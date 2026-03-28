import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Shield, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { BenefitCard } from "../components/BenefitCard";
import { LocationMap } from "../components/LocationMap";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  getQualifiedBenefits,
  getLocationsByZip,
  type Benefit,
  type Location,
} from "../data/benefits";

interface VetData {
  branch: string;
  yearsServed: number;
  disabilityRating: number;
  zipCode: string;
}

export function Results() {
  const navigate = useNavigate();
  const [vetData, setVetData] = useState<VetData | null>(null);
  const [qualifiedBenefits, setQualifiedBenefits] = useState<Benefit[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedBenefitId, setSelectedBenefitId] = useState<string | undefined>();

  useEffect(() => {
    const dataStr = sessionStorage.getItem("vetNavData");
    if (!dataStr) {
      navigate("/");
      return;
    }

    const data: VetData = JSON.parse(dataStr);
    setVetData(data);

    // Get qualified benefits
    const benefits = getQualifiedBenefits(
      data.yearsServed,
      data.disabilityRating
    );
    setQualifiedBenefits(benefits);

    // Get locations
    const locs = getLocationsByZip(data.zipCode);
    setLocations(locs);
  }, [navigate]);

  const handleShowLocations = (benefitId: string) => {
    setSelectedBenefitId(benefitId === selectedBenefitId ? undefined : benefitId);
  };

  if (!vetData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Header with Crisis Line */}
      <header className="sticky top-0 z-50 bg-[#0076AB] border-b-4 border-[#0076AB] py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="lg"
              className="text-base md:text-lg hover:bg-white/20 text-white"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              <ArrowLeft className="w-5 h-5 mr-1 md:mr-2" />
              Back
            </Button>
            {/* Patriotic Shield */}
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Times New Roman', serif" }}>
                Your Benefits
              </h1>
              <p className="text-xs md:text-base text-white" style={{ fontFamily: "'Times New Roman', serif" }}>
                Based on your service record
              </p>
            </div>
          </div>

          {/* Crisis Line Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white h-10 md:h-12 px-3 md:px-6 text-xs md:text-base font-bold shadow-lg animate-pulse"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                <span className="hidden md:inline">Crisis Line</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-900">
                  You Are Not Alone
                </DialogTitle>
                <DialogDescription className="text-lg text-slate-700 pt-4">
                  If you're a veteran in crisis or concerned about one, reach out to the resources below. Many of the responders are qualified and are veterans themselves.:
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefits Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                You May Qualify For
              </h2>
              <p className="text-lg text-slate-600">
                {qualifiedBenefits.length} benefit
                {qualifiedBenefits.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <div className="space-y-4">
              {qualifiedBenefits.length > 0 ? (
                qualifiedBenefits.map((benefit) => (
                  <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    onShowLocations={handleShowLocations}
                    isSelected={selectedBenefitId === benefit.id}
                  />
                ))
              ) : (
                <div className="bg-white rounded-xl p-8 text-center shadow-md">
                  <p className="text-xl text-slate-600">
                    No benefits match your current criteria. Please contact a VA
                    representative for more information.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:sticky lg:top-8 h-[500px] lg:h-[calc(100vh-6rem)]">
            <div className="bg-white rounded-xl p-4 shadow-md h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  Nearby Locations
                </h2>
                <p className="text-base lg:text-lg text-slate-600">
                  {selectedBenefitId
                    ? "Showing locations for selected benefit"
                    : "All VA facilities in your area"}
                </p>
              </div>
              <div className="flex-1 min-h-0">
                <LocationMap
                  locations={locations}
                  center={[37.7749, -122.4194]}
                  selectedBenefitId={selectedBenefitId}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Help */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <Phone className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Need Help?
                </h3>
                <p className="text-lg text-slate-600 mb-3">
                  Contact the VA Benefits Hotline for assistance
                </p>
                <p className="text-xl font-bold text-blue-600">
                  1-800-827-1000
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Monday - Friday, 8:00 AM - 9:00 PM ET
                </p>
              </div>
            </div>
          </div>

          {/* Secure Badge */}
          <div className="bg-blue-50 rounded-xl p-6 shadow-md border-2 border-blue-100">
            <div className="flex items-start gap-4">
              <Shield className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Your Privacy Matters
                </h3>
                <p className="text-lg text-slate-600">
                  Your information is used only to find benefits. We don't store 
                  or share your personal data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}