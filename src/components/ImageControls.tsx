import React from 'react';

interface ImageControlsProps {
  opacity: number;
  position: { x: number; y: number };
  scale: number;
  onOpacityChange: (value: number) => void;
  onPositionChange: (axis: 'x' | 'y', value: number) => void;
  onScaleChange: (value: number) => void;
}

const ImageControls = ({
  opacity,
  position,
  scale,
  onOpacityChange,
  onPositionChange,
  onScaleChange
}: ImageControlsProps) => {
  return (
    <div className="w-full space-y-4 bg-white p-4 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image Scale
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => onScaleChange(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-600 w-12">
            {(scale * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image Opacity
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={opacity * 100}
            onChange={(e) => onOpacityChange(Number(e.target.value) / 100)}
            className="w-full"
          />
          <span className="text-sm text-gray-600 w-12">
            {(opacity * 100).toFixed(0)}%
          </span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Horizontal Position
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="-200"
            max="200"
            value={position.x}
            onChange={(e) => onPositionChange('x', Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-600 w-12">
            {position.x}px
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Vertical Position
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="-200"
            max="200"
            value={position.y}
            onChange={(e) => onPositionChange('y', Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-600 w-12">
            {position.y}px
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageControls;