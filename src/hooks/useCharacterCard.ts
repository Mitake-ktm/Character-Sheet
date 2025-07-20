import { useState, useRef, useEffect } from "react";
import { fadeOutAudio } from '../utils/sound';
import { modalSound } from '../utils/sound';
import type { RefObject } from 'react';

export function useCharacterCard() {
  const [flipped, setFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [showParticles, setShowParticles] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showModal]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Effet plus prononcé sur les bords
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeaveHook = () => {
    setRotate({ x: 0, y: 0 });
    setShowParticles(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  const toggleFlip = () => {
    setFlipped(prev => !prev);
    return true;
  };

  const handleCloseModal = () => {
    fadeOutAudio(modalSound);
    setTimeout(() => setShowModal(false), 300);
  };

  return {
    flipped,
    showModal,
    rotate,
    showParticles,
    cardRef,
    openButtonRef,
    modalRef,
    setShowModal,
    setShowParticles,
    handleMouseMove,
    handleMouseLeaveHook,
    handleKeyDown,
    toggleFlip,
    handleCloseModal
  };
}