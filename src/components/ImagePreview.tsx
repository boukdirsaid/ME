import React from 'react';

interface ImagePreviewProps {
  imageUrl: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const ImagePreview = ({ imageUrl, onConfirm, onCancel, isLoading }: ImagePreviewProps) => {
  if (!imageUrl && !isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Preview Image</h3>
        <div className="relative aspect-video mb-4 bg-gray-50 rounded-lg">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <img
              src={imageUrl!}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md disabled:bg-blue-400"
            disabled={isLoading}
          >
            Apply to Cover
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;