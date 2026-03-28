export function BranchLogos() {
  const branches = [
    {
      name: "Army",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="#4B5320" />
          <polygon points="50,20 60,45 85,45 65,60 70,85 50,70 30,85 35,60 15,45 40,45" fill="#FFD700" />
          <text x="50" y="95" textAnchor="middle" fill="#4B5320" fontSize="12" fontWeight="bold">ARMY</text>
        </svg>
      ),
    },
    {
      name: "Navy",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="#003087" />
          <path d="M 30,40 L 50,25 L 70,40 L 70,65 L 50,75 L 30,65 Z" fill="#FFD700" />
          <circle cx="50" cy="50" r="8" fill="#003087" />
          <text x="50" y="95" textAnchor="middle" fill="#003087" fontSize="12" fontWeight="bold">NAVY</text>
        </svg>
      ),
    },
    {
      name: "Air Force",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="#004F9F" />
          <path d="M 50,25 L 65,50 L 75,50 L 50,70 L 25,50 L 35,50 Z" fill="#FFD700" />
          <circle cx="50" cy="50" r="6" fill="#004F9F" />
          <text x="50" y="95" textAnchor="middle" fill="#004F9F" fontSize="10" fontWeight="bold">AIR FORCE</text>
        </svg>
      ),
    },
    {
      name: "Marines",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="#CC0000" />
          <circle cx="50" cy="40" r="20" fill="#FFD700" />
          <path d="M 35,55 L 50,70 L 65,55" fill="none" stroke="#FFD700" strokeWidth="4" />
          <text x="50" y="95" textAnchor="middle" fill="#CC0000" fontSize="11" fontWeight="bold">MARINES</text>
        </svg>
      ),
    },
    {
      name: "Coast Guard",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="#005288" />
          <path d="M 35,35 L 65,35 L 65,55 L 50,65 L 35,55 Z" fill="#FFD700" />
          <rect x="47" y="55" width="6" height="15" fill="#FFD700" />
          <text x="50" y="95" textAnchor="middle" fill="#005288" fontSize="9" fontWeight="bold">COAST GUARD</text>
        </svg>
      ),
    },
    {
      name: "Space Force",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="#1C3F94" />
          <polygon points="50,25 55,40 70,42 58,53 62,68 50,60 38,68 42,53 30,42 45,40" fill="#FFFFFF" />
          <circle cx="50" cy="75" r="3" fill="#FFFFFF" />
          <text x="50" y="95" textAnchor="middle" fill="#1C3F94" fontSize="9" fontWeight="bold">SPACE FORCE</text>
        </svg>
      ),
    },
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
              {branch.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
