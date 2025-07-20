import { motion, AnimatePresence } from "framer-motion";
import { useCharacterCard } from "../hooks/useCharacterCard";
import { CharacterParticles } from "./CharacterParticles";
import { playSound, flipSound, modalSound } from "../utils/sound";
import Modal from "./Modal";
import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import { isMobile } from "react-device-detect";
import type { Character } from '../types';
import type { RefObject } from 'react';

type Props = {
  character: Character;
};

export function CharacterCard({ character }: Props) {
  const {
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
  } = useCharacterCard();

  const handleClick = () => {
    if (toggleFlip()) {
      playSound(flipSound);
    }
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
    playSound(modalSound, 1);
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.boxShadow = `0 0 25px ${character.color}`;
    }
    setShowParticles(true);
  };

  const handleMouseLeave = () => {
    handleMouseLeaveHook();
    if (cardRef.current) {
      cardRef.current.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
    }
  };

  return (
    <>
      <motion.div
        className="relative w-72 h-96 perspective rounded-3xl cursor-pointer overflow-visible box-border"
        tabIndex={0}
        aria-label={`Carte de ${character.name}`}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        ref={cardRef}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          border: `3px solid ${character.color}`,
          boxShadow: `0 0 0 rgba(0,0,0,0)`,
          backgroundImage: "linear-gradient(135deg, #f9c6d3 0%, #a3d5ff 100%)",
        }}
        onMouseEnter={handleMouseEnter}
      >
        {showParticles && (
          <CharacterParticles 
            color={character.color} 
            particleConfig={character.particle} 
          />
        )}

        <motion.div
          animate={{
          rotateX: rotate.x,
          rotateY: rotate.y + (flipped ? 180 : 0),
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Card */}
          <div 
            className="absolute w-full h-full backface-hidden rounded-[20px]"
            style={{ 
              zIndex: flipped ? 1 : 2,
              transform: 'rotateY(0deg)'
            }}
          >
            <CardFront 
              character={character} 
              flipped={flipped}
              isMobile={isMobile}
              onFlip={handleClick}
            />
          </div>
          
          {/* Back Card */}
          <div 
            className="absolute w-full h-full backface-hidden rounded-[20px]"
            style={{ 
              zIndex: flipped ? 2 : 1,
              transform: 'rotateY(180deg)'
            }}
          >
            <CardBack 
              character={character} 
              openButtonRef={openButtonRef as RefObject<HTMLButtonElement>}
              onOpenModal={handleOpenModal}
            />
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={handleCloseModal}
            innerRef={modalRef as RefObject<HTMLDivElement>}
            character={character}
          />
        )}
      </AnimatePresence>
    </>
  );
}