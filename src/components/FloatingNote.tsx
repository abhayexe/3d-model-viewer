import React, { useState } from 'react';
import { X } from 'lucide-react';

const FloatingNote = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 bg-white rounded-lg shadow-lg overflow-hidden animate-in slide-in-from-right">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b">
        <h3 className="text-sm font-medium text-gray-700">Welcome! 👋</h3>
        <button 
          onClick={() => setIsVisible(false)} 
          className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-md"
        >
          <X size={12} className="text-white" />
        </button>
      </div>
      
      {/* Body */}
      <div className="p-4 text-sm text-gray-600 space-y-2">
        <p>
          Here's how to get started:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Drag and drop your 3D model (<code>.glb</code> only).</li>
          <li>
            There are options on the left side of the screen:
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>
                <strong>Postprocessing 1 (SSGI)</strong>: Renders your model with a realistic look.
              </li>
              <li>
                <strong>Postprocessing 2 (SSR + Bloom + Saturation)</strong>: Creates a more beautiful, though less realistic, appearance.
              </li>
            </ul>
          </li>
          <li>
            Recommendations:
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>
                While using Postprocessing 1 with the environment, disable lighting and adjust the environment presets for the best results.
              </li>
              <li>
                While using Postprocessing 2, enable lighting and the plane, and disable the environment.
              </li>
              <li>
                Rings and Boxes are fun effects, recommended only for Postprocessing 2.
              </li>
            </ul>
          </li>
          <li>
            You can adjust the model's size using the <strong>Scale</strong> setting.
          </li>
        </ul>
        <p className="text-gray-500 text-xs mt-3">
          Made with ❤️ by Abhay
        </p>
      </div>
    </div>
  );
};

export default FloatingNote;
