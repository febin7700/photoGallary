"use client"; // For Next.js 13+ (app directory) to use state/hooks

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/ImageGallery.module.css";

const images = [
  "/images/pic1.jpg",
  "/images/pic2.jpg",
  "/images/pic3.jpg",
  "/images/pic4.jpg",
  "/images/pic5.jpg",
  "/images/pic6.jpg",
  "/images/pic7.jpg",
  "/images/pic8.jpg",
  "/images/pic9.jpg",
  "/images/pic10.jpg",
  "/images/pic11.jpg",
  "/images/pic12.jpg",

];

export default function ImageGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGrid}>
        {images.map((img, index) => (
          <div
            key={index}
            className={styles.thumbnail}
            onClick={() => openModal(index)}
          >
            <Image src={img} alt={`Gallery ${index}`} width={300} height={200} />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <span className={styles.closeButton} onClick={closeModal}>
            &times;
          </span>
          <Image
            src={images[currentIndex]}
            alt={`Modal ${currentIndex}`}
            width={800}
            height={600}
            className={styles.modalImage}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />
          <button
            className={styles.prevButton}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            &#10094;
          </button>
          <button
            className={styles.nextButton}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
