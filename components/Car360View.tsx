'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react'

interface Car360ViewProps {
  images: string[]
  carName: string
  autoPlay?: boolean
}

export default function Car360View({ images, carName, autoPlay = false }: Car360ViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragVelocity, setDragVelocity] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || images.length === 0) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
      return
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 2000)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isPlaying, images.length])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setIsPlaying(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const dragDistance = e.clientX - dragStart
    const threshold = 30
    const sensitivity = 0.5

    if (Math.abs(dragDistance) > threshold) {
      const imageCount = Math.ceil(Math.abs(dragDistance) * sensitivity / 100)
      const direction = dragDistance > 0 ? -1 : 1

      setCurrentIndex((prev) => {
        let newIndex = prev + direction * imageCount
        while (newIndex < 0) newIndex += images.length
        while (newIndex >= images.length) newIndex -= images.length
        return newIndex
      })

      setDragVelocity(dragDistance)
      setDragStart(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
    setIsPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const dragDistance = e.touches[0].clientX - dragStart
    const threshold = 30
    const sensitivity = 0.5

    if (Math.abs(dragDistance) > threshold) {
      const imageCount = Math.ceil(Math.abs(dragDistance) * sensitivity / 100)
      const direction = dragDistance > 0 ? -1 : 1

      setCurrentIndex((prev) => {
        let newIndex = prev + direction * imageCount
        while (newIndex < 0) newIndex += images.length
        while (newIndex >= images.length) newIndex -= images.length
        return newIndex
      })

      setDragStart(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsPlaying(false)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsPlaying(false)
  }

  const resetView = () => {
    setCurrentIndex(0)
    setIsPlaying(autoPlay)
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center h-96">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Image Container */}
      <div
        ref={containerRef}
        className="relative w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing select-none h-96"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image Display */}
        <img
          src={images[currentIndex]}
          alt={`${carName} - view ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          draggable={false}
        />

        {/* Rotation Indicator */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur">
          360° View: {currentIndex + 1} / {images.length}
        </div>

        {/* Drag Hint (shows on hover) */}
        {!isDragging && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="text-white text-center">
              <p className="text-lg font-semibold mb-2">Drag to Rotate</p>
              <div className="flex justify-center gap-2">
                <ChevronLeft size={32} />
                <ChevronRight size={32} />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-all z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-all z-10"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Control Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-all"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={resetView}
            className="bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-all"
            aria-label="Reset view"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* Thumbnail Indicators */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsPlaying(false)
            }}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? 'border-blue-500 ring-2 ring-blue-400'
                : 'border-gray-600 opacity-60 hover:opacity-100'
            }`}
            aria-label={`Go to image ${index + 1}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Info Text */}
      <p className="text-sm text-gray-400 text-center">
        Drag horizontally to rotate • Click arrows to step through • Auto-rotation available
      </p>
    </div>
  )
}
