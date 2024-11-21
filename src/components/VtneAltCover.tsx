import React, { useRef, useState, useCallback } from 'react';
import ImagePreview from './ImagePreview';
import ImageControls from './ImageControls';
import DownloadButton from './DownloadButton';
import TextControl from './TextControls';
import { ChromePicker } from 'react-color';

interface TextStyle {
  scale: number;
  position: { x: number; y: number };
  color: string;
}

const VtneAltCover = () => {
  const coverRef = useRef<HTMLDivElement>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#1e40af');
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const [textStyles, setTextStyles] = useState<Record<string, TextStyle>>({
    title: { scale: 1, position: { x: 0, y: 0 }, color: '#ffffff' },
    subtitle: { scale: 1, position: { x: 0, y: 0 }, color: '#fbbf24' },
    year: { scale: 1, position: { x: 0, y: 0 }, color: '#ffffff' },
    feature1: { scale: 1, position: { x: 0, y: 0 }, color: '#ffffff' },
    feature2: { scale: 1, position: { x: 0, y: 0 }, color: '#ffffff' },
    feature3: { scale: 1, position: { x: 0, y: 0 }, color: '#ffffff' },
    author: { scale: 1, position: { x: 0, y: 0 }, color: '#ffffff' },
    bottomText: { scale: 1, position: { x: 0, y: 0 }, color: '#fbbf24' }
  });

  const [texts, setTexts] = useState({
    title: 'VTNE',
    subtitle: 'PREP STUDY GUIDE',
    year: '2025-2026',
    feature1: 'EXTRA 399+ STUDY TOOLS',
    feature2: 'PRACTICE QUESTIONS',
    feature3: 'DETAILED EXPLANATIONS',
    author: 'AIDEN WHITLOCK',
    bottomText: 'VETERINARY TECHNICIAN LICENSE'
  });

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImageLoading(true);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setIsImageLoading(false);
        setImageScale(1);
        setImagePosition({ x: 0, y: 0 });
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const handleConfirmImage = useCallback(() => {
    setBackgroundImage(previewImage);
    setPreviewImage(null);
  }, [previewImage]);

  const handleCancelImage = useCallback(() => {
    setPreviewImage(null);
  }, []);

  const updateText = (key: keyof typeof texts, value: string) => {
    setTexts(prev => ({ ...prev, [key]: value }));
  };

  const updateTextStyle = (key: string, property: keyof TextStyle, value: any) => {
    setTextStyles(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [property]: value
      }
    }));
  };

  const TextElement = ({ textKey, className }: { textKey: keyof typeof texts, className?: string }) => {
    const style = textStyles[textKey];
    return (
      <div
        style={{
          transform: `translate(${style.position.x}px, ${style.position.y}px) scale(${style.scale})`,
          color: style.color,
          transition: 'transform 0.2s ease-out',
        }}
        className={className}
      >
        {texts[textKey]}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center gap-8 py-8">
        <div 
          ref={coverRef}
          className="w-[1600px] h-[2560px] rounded-lg shadow-2xl overflow-hidden relative"
          style={{
            transform: 'scale(0.375)',
            transformOrigin: 'top center'
          }}
        >
          {/* Background */}
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor }}
          />
          
          {/* Content Container */}
          <div className="relative h-full p-24 flex flex-col">
            {backgroundImage && (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <img 
                  src={backgroundImage}
                  alt="Background"
                  className="max-w-full max-h-full object-contain"
                  style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                    opacity: imageOpacity,
                    pointerEvents: 'none'
                  }}
                />
              </div>
            )}

            {/* Title Section */}
            <div className="text-center space-y-8 relative z-10">
              <TextElement textKey="title" className="text-[220px] font-black tracking-tight leading-none" />
              <TextElement textKey="subtitle" className="text-[100px] font-bold" />
              <TextElement textKey="year" className="text-[80px] font-bold" />
            </div>

            {/* Features */}
            <div className="mt-auto space-y-12 relative z-10">
              <TextElement textKey="feature1" className="text-6xl font-bold p-8 rounded-2xl" />
              <TextElement textKey="feature2" className="text-6xl font-bold p-8 rounded-2xl" />
              <TextElement textKey="feature3" className="text-6xl font-bold p-8 rounded-2xl" />
            </div>

            {/* Author & License */}
            <div className="mt-24 space-y-8 text-center relative z-10">
              <TextElement textKey="author" className="text-7xl font-bold" />
              <TextElement textKey="bottomText" className="text-5xl font-bold" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-[600px] space-y-4">
          {/* Background Color */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Background Color</h3>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded cursor-pointer border"
                style={{ backgroundColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
              {showColorPicker && (
                <div className="absolute z-50">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowColorPicker(false)}
                  />
                  <ChromePicker
                    color={backgroundColor}
                    onChange={(color) => setBackgroundColor(color.hex)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Cover Image
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImageUpload}
              disabled={isImageLoading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                disabled:opacity-50"
            />
          </div>

          {backgroundImage && (
            <ImageControls
              opacity={imageOpacity}
              position={imagePosition}
              scale={imageScale}
              onOpacityChange={setImageOpacity}
              onPositionChange={(axis, value) => setImagePosition(prev => ({ ...prev, [axis]: value }))}
              onScaleChange={setImageScale}
            />
          )}

          {/* Text Controls */}
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-lg font-semibold mb-4">Text Controls</h3>
            <div className="grid grid-cols-1 gap-6">
              {Object.entries(texts).map(([key, value]) => (
                <div key={key} className="space-y-4 border-b pb-4">
                  <TextControl
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    value={value}
                    onChange={(newValue) => updateText(key as keyof typeof texts, newValue)}
                  />
                  
                  {/* Text Position Controls */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="-500"
                        max="500"
                        value={textStyles[key].position.x}
                        onChange={(e) => updateTextStyle(key, 'position', { ...textStyles[key].position, x: Number(e.target.value) })}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="-500"
                        max="500"
                        value={textStyles[key].position.y}
                        onChange={(e) => updateTextStyle(key, 'position', { ...textStyles[key].position, y: Number(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Text Scale Control */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Scale</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={textStyles[key].scale}
                      onChange={(e) => updateTextStyle(key, 'scale', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Text Color Control */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Color</label>
                    <input
                      type="color"
                      value={textStyles[key].color}
                      onChange={(e) => updateTextStyle(key, 'color', e.target.value)}
                      className="w-full h-8"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center pt-4">
            <DownloadButton coverRef={coverRef} />
          </div>
        </div>
      </div>

      <ImagePreview
        imageUrl={previewImage}
        onConfirm={handleConfirmImage}
        onCancel={handleCancelImage}
        isLoading={isImageLoading}
      />
    </>
  );
};

export default VtneAltCover;