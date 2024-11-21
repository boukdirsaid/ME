import React, { useState } from 'react';
import html2canvas from 'html2canvas';

interface DownloadButtonProps {
  coverRef: React.RefObject<HTMLDivElement>;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ coverRef }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!coverRef.current || isLoading) return;

    setIsLoading(true);
    try {
      const canvas = await html2canvas(coverRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: 1600, // Kindle-optimized width
        height: 2560, // Kindle-optimized height
      });

      setPreviewUrl(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;

    const link = document.createElement('a');
    link.download = 'ATI-TEAS-Study-Guide-Cover.png';
    link.href = previewUrl;
    link.click();
    setPreviewUrl(null);
  };

  const handleCancel = () => {
    setPreviewUrl(null);
  };

  return (
    <>
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className={`
          flex items-center justify-center gap-2 
          px-6 py-3 rounded-lg font-medium
          transition-all duration-200
          ${isLoading 
            ? 'bg-blue-400 cursor-wait' 
            : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'
          }
          text-white shadow-lg hover:shadow-xl
          disabled:opacity-70
        `}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Generating High-Res Cover...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Generate Kindle Cover</span>
          </>
        )}
      </button>

      {previewUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Preview Kindle Cover</h3>
            <div className="relative mb-4">
              <img
                src={previewUrl}
                alt="Generated Cover Preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
              >
                Download for Kindle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadButton;