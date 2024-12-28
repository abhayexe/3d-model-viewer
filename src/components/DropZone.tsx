import { Upload } from 'lucide-react';

interface DropZoneProps {
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function DropZone({ onDragOver, onDrop }: DropZoneProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <Upload size={48} className="mb-4" />
      <p className="text-xl">Drag and drop a .glb file here</p>
    </div>
  );
}