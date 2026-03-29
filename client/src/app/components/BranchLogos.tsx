import armyLogo from "../../assets/army.jpg";
import navyLogo from "../../assets/navy.avif";
import airForceLogo from "../../assets/airforce.png";
import marineLogo from "../../assets/marine.png";
import coastGuardLogo from "../../assets/coastguard.jpg";
import spaceForceLogo from "../../assets/spaceforce.png";

export function BranchLogos() {
  const branches = [
    { name: "Army", icon: armyLogo },
    { name: "Navy", icon: navyLogo },
    { name: "Air Force", icon: airForceLogo },
    { name: "Marines", icon: marineLogo },
    { name: "Coast Guard", icon: coastGuardLogo },
    { name: "Space Force", icon: spaceForceLogo },
  ];

  return (
    <div className="bg-white border-2 border-blue-100 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold text-slate-900 text-center mb-4">
        Proudly Serving All Branches
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {branches.map((branch) => (
          <div key={branch.name} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20">
              <img src={branch.icon} alt={branch.name} className="w-full h-full object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}