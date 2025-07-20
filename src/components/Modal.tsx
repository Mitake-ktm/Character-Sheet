import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { getContrastColor, darkenColor } from '../utils/color';
import type { Character } from '../types';
import type { RefObject } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  innerRef: RefObject<HTMLDivElement | null>;
  character: Character;
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export default function Modal({ isOpen, onClose, innerRef, character }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-neutral-900 p-6 rounded-2xl max-w-md w-full shadow-xl relative outline-none"
            onClick={(e) => e.stopPropagation()}
            ref={innerRef as RefObject<HTMLDivElement>}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            style={{
              border: `3px solid ${character.color}`,
              boxShadow: `0 0 30px ${character.color}80`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-xl w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Fermer"
            >
              &times;
            </button>
            
            <h2 
              id="modal-title" 
              className="text-2xl font-bold mb-3 text-center"
              style={{ color: character.color }}
            >
              {character.name}
            </h2>
            
            {character.pixelArt && (
              <div className="flex justify-center mb-4">
                <img
                  src={character.pixelArt}
                  alt={`${character.name} pixel art`}
                  className="w-40 h-40 object-contain border-4 rounded-lg"
                  style={{ 
                    borderColor: character.color,
                    boxShadow: `0 0 15px ${character.color}80`
                  }}
                />
              </div>
            )}
            
            <p className="mb-4 text-center italic text-gray-700 dark:text-gray-300">
              "{character.quote}"
            </p>
            
            <p className="mb-4 text-justify">
              {character.description}
            </p>
            
            <div className="bg-gray-100 dark:bg-neutral-800 rounded-xl p-4 mb-4">
              <h3 className="font-bold mb-2 text-lg" style={{ color: character.color }}>Détails</h3>
              <ul className="space-y-2">
                <li><span className="font-semibold">Âge :</span> {character.details.age}</li>
                <li><span className="font-semibold">Taille :</span> {character.details.size}</li>
                <li className="mt-3">
                  <span className="font-semibold">Personnalité :</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {character.details.personnality.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 text-sm rounded-full font-medium"
                        style={{
                          backgroundColor: character.color,
                          color: getContrastColor(character.color),
                        }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </li>
                
                {character.details.skills && character.details.skills.length > 0 && (
                  <li className="mt-3">
                    <span className="font-semibold">Compétences :</span>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {character.details.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="text-center">
              <button
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:scale-105 transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={onClose}
                style={{
                  backgroundColor: character.color,
                  color: getContrastColor(character.color),
                  border: `2px solid ${darkenColor(character.color, 0.2)}`,
                  boxShadow: `0 4px 12px ${darkenColor(character.color, 0.3)}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = darkenColor(character.color, 0.15);
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = character.color;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label="Fermer la fenêtre"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}