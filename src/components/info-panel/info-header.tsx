import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const models = ["OraclA c1-pro", "OraclA XT-2", "OraclA Quantum", "OraclA Ultra"];

const InfoHeader = () => {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-center w-full py-3 border-b border-gray-200 relative">
      <div 
        className="flex items-center cursor-pointer text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#542B81] via-[#DC379F] to-[#F3A199]"
        onClick={() => setIsOpen(!isOpen)}

        style={{ fontFamily: 'Sansation' }}
      >
        {selectedModel}
        <ChevronDown className="w-5 h-5 ml-2 text-gray-600 transition-transform duration-300" 
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} 
        />
      </div>

      {isOpen && (
        <div className="absolute top-12 bg-white shadow-lg border border-gray-200 rounded-lg w-48 text-sm">
          {models.map((model, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all"
              onClick={() => {
                setSelectedModel(model);
                setIsOpen(false);
              }}
            >
              {model}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default InfoHeader;
