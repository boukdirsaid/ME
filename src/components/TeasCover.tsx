import React, { useRef, useState, useCallback } from 'react';
import ImagePreview from './ImagePreview';
import ImageControls from './ImageControls';
import DownloadButton from './DownloadButton';
import TextControl from './TextControls';

const TeasCover = () => {
  const coverRef = useRef<HTMLDivElement>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [texts, setTexts] = useState({
    title: 'VTNE PERP',
    subtitle: 'STUDY GUIDE',
    year: 'Practice Tests for Aspiring Veterinary Technicians',
    feature1: '200 Flashcards',
    feature2: '7 Full-Length Tests',
    feature3: '50 HRs E-Learning',
    bottomText: 'The Most Updated Guide with Practice Tests to Pass the Exam on Your First Attempt'
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
        {/* Kindle-optimized dimensions (1.6:1 ratio) */}
        <div 
          ref={coverRef}
          className="w-[1600px] h-[2560px] rounded-lg shadow-2xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #003366 0%, #001a33 100%)',
            transform: 'scale(0.375)', // Scale down for display (1600 * 0.375 = 600)
            transformOrigin: 'top center'
          }}
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 w-full py-12 px-16">
            <h1 className="text-6xl font-bold text-blue-900">Caitlin Burton</h1>
          </div>

          {/* Main Content */}
          <div className="p-24 flex flex-col h-[calc(100%-144px)]">
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
            <div className="text-center space-y-12 relative z-10">
              <h2 className="text-[200px] font-black text-white leading-tight tracking-tight">
                {texts.title}
              </h2>
              <h3 className="text-[150px] font-bold text-yellow-400 tracking-wide">
                {texts.subtitle}
              </h3>
              <div className="text-8xl font-bold text-white mt-12">
                {texts.year}
              </div>
            </div>

            {/* Features List */}
            <div className="mt-auto space-y-12 relative z-10">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 rounded-2xl transform hover:scale-[1.02] transition-transform">
                <span className="text-blue-900 text-5xl font-bold">✓ {texts.feature1}</span>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 rounded-2xl transform hover:scale-[1.02] transition-transform">
                <span className="text-blue-900 text-5xl font-bold">✓ {texts.feature2}</span>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 rounded-2xl transform hover:scale-[1.02] transition-transform">
                <span className="text-blue-900 text-5xl font-bold">✓ {texts.feature3}</span>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="mt-24 text-white/90 text-4xl text-center relative z-10 bg-blue-900/50 p-8 rounded-2xl backdrop-blur-sm">
              {texts.bottomText}
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
              <TextControl
                label="Main Title"
                value={texts.title}
                onChange={(value) => updateText('title', value)}
              />
              <TextControl
                label="Subtitle"
                value={texts.subtitle}
                onChange={(value) => updateText('subtitle', value)}
              />
              <TextControl
                label="Year"
                value={texts.year}
                onChange={(value) => updateText('year', value)}
              />
              <TextControl
                label="Feature 1"
                value={texts.feature1}
                onChange={(value) => updateText('feature1', value)}
              />
              <TextControl
                label="Feature 2"
                value={texts.feature2}
                onChange={(value) => updateText('feature2', value)}
              />
              <TextControl
                label="Feature 3"
                value={texts.feature3}
                onChange={(value) => updateText('feature3', value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bottom Text
                </label>
                <textarea
                  value={texts.bottomText}
                  onChange={(e) => updateText('bottomText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
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

export default TeasCover;