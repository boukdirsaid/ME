import React, { useRef, useState, useCallback } from 'react';
import ImagePreview from './ImagePreview';
import ImageControls from './ImageControls';
import DownloadButton from './DownloadButton';
import TextControl from './TextControls';

const BookCover = () => {
  const coverRef = useRef<HTMLDivElement>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [texts, setTexts] = useState({
    title: 'VTNE',
    subtitle: 'Secrets Study Guide',
    edition: 'by Caitlin Burton',
    description: 'Exam Review and VTNE Practice Test for the Veterinary Technician National Exam',
    checkmark: '✓',
    author: 'AIDEN WHITLOCK'
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
          {/* Main Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]">
            {backgroundImage && (
              <img 
                src={backgroundImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                  opacity: imageOpacity,
                  pointerEvents: 'none'
                }}
              />
            )}
          </div>

          {/* Brand Bar */}
          <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 p-12">
            <div className="text-[120px] font-black text-blue-900 tracking-tight">
             Mastery®
            </div>
            <div className="text-[60px] font-bold text-blue-900">
              TEST PREPARATION
            </div>
          </div>

          {/* Content Container */}
          <div className="relative p-24 flex flex-col h-[calc(100%-200px)]">
            {/* Title Section */}
            <div className="space-y-12">
              <h1 className="text-[200px] font-black text-white leading-none tracking-tight">
                {texts.title}
              </h1>
              <h2 className="text-[120px] font-bold text-yellow-400">
                {texts.subtitle}
              </h2>
              <div className="text-[80px] font-bold text-white/90">
                {texts.edition}
              </div>
            </div>

            {/* Description */}
            <div className="mt-24 text-[64px] leading-tight text-white/80 max-w-[80%]">
              {texts.description}
            </div>

            {/* Large Checkmark */}
            <div className="mt-auto">
              <div className="bg-yellow-400 w-[240px] h-[240px] rounded-full flex items-center justify-center">
                <span className="text-[160px] font-black text-blue-900">
                  {texts.checkmark}
                </span>
              </div>
            </div>

            {/* Author */}
            <div className="mt-24 text-[72px] font-bold text-white/90">
              {texts.author}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-[600px] space-y-4">
          <div>
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

          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-lg font-semibold mb-4">Text Controls</h3>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(texts).map(([key, value]) => (
                <TextControl
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  value={value}
                  onChange={(newValue) => updateText(key as keyof typeof texts, newValue)}
                />
              ))}
            </div>
          </div>

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

export default BookCover;