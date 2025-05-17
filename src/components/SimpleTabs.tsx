import { ReactNode, useState } from 'react';

interface TabProps {
  label: string;
  children: ReactNode;
}

export function SimpleTabs({ tabs }: { tabs: TabProps[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium transition-colors newspaper-font ${
              activeTab === index 
                ? 'border-b-2 border-[#847e58] text-[#6e6c64] bg-cream newspaper-font' 
                : 'text-gray-700 hover:text-[#847e58] newspaper-font'
            }` }
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeTab].children}
      </div>
    </div>
  );
}
