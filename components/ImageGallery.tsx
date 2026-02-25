'use client'

import React, { useState } from 'react'
import { Image as ImageIcon, RotateCw, Cube } from 'lucide-react'
import Car360View from './Car360View'
import CarViewer3D from './CarViewer3D'

type GalleryTab = 'images' | '360' | '3d'

interface ImageGalleryProps {
  images: string[]
  carName: string
  carMake: string
  enable3D?: boolean
  enable360?: boolean
}

export default function ImageGallery({
  images,
  carName,
  carMake,
  enable3D = true,
  enable360 = true,
}: ImageGalleryProps) {
  const [activeTab, setActiveTab] = useState<GalleryTab>('images')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const mainImage = images[selectedImageIndex] || images[0]

  const tabs: { id: GalleryTab; label: string; icon: React.ReactNode; enabled: boolean }[] = [
    { id: 'images', label: 'Images', icon: <ImageIcon size={18} />, enabled: true },
    { id: '360', label: '360° View', icon: <RotateCw size={18} />, enabled: enable360 && images.length > 1 },
    { id: '3d', label: '3D Model', icon: <Cube size={18} />, enabled: enable3D },
  ]

  const enabledTabs = tabs.filter(t => t.enabled)

  return (
    <div className="w-full space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-700 overflow-x-auto">
        {enabledTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all whitespace-nowrap border-b-2 -mb-[2px] ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden aspect-video">
              <img
                src={mainImage}
                alt={`${carMake} ${carName}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white px-3 py-2 rounded-lg text-sm transition-all"
              >
                Fullscreen
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex
                      ? 'border-blue-500 ring-2 ring-blue-400'
                      : 'border-gray-600 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Select image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Image Counter */}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <p>
                Image {selectedImageIndex + 1} of {images.length}
              </p>
              <button
                onClick={() => setIsFullscreen(true)}
                className="text-blue-400 hover:text-blue-300"
              >
                View all →
              </button>
            </div>
          </div>
        )}

        {/* 360 View Tab */}
        {activeTab === '360' && enable360 && (
          <div className="animate-fadeIn">
            <Car360View images={images} carName={`${carMake} ${carName}`} autoPlay={true} />
          </div>
        )}

        {/* 3D Model Tab */}
        {activeTab === '3d' && enable3D && (
          <div className="animate-fadeIn">
            <CarViewer3D carName={`${carMake} ${carName}`} />
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-6xl space-y-4">
            {/* Fullscreen Image */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={mainImage}
                alt={`${carMake} ${carName} fullscreen`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center gap-4">
              <div className="text-white text-sm">
                {selectedImageIndex + 1} / {images.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    setSelectedImageIndex((prev) => (prev + 1) % images.length)
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Next
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
