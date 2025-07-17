import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { getContrastColor } from '../utils/color';
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-neutral-900 p-6 rounded-2xl max-w-md w-full shadow-lg relative outline-none"
            onClick={(e) => e.stopPropagation()}
            ref={innerRef as RefObject<HTMLDivElement>}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            style={{
              border: `2px solid ${character.color}`,
              boxShadow: `0 0 25px ${character.color}`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 id="modal-title" className="text-xl font-bold mb-2">
              {character.name}
            </h2>
            
            {character.pixelArt && (
              <img
                src={character.pixelArt}
                alt={`${character.name} pixel art`}
                className="w-32 h-32 mx-auto mb-4"
              />
            )}
            
            <p className="mb-4">{character.description}</p>
            
            <ul className="text-sm space-y-1 mb-2">
              <li><strong>Âge :</strong> {character.details.age}</li>
              <li><strong>Taille :</strong> {character.details.size}</li>
            </ul>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {character.details.personnality.map((trait) => (
                <span
                  key={trait}
                  className="px-2 py-1 text-xs rounded-full font-medium"
                  style={{
                    backgroundColor: character.color,
                    color: getContrastColor(character.color),
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
            
            <button
              className="mt-4 px-4 py-2 rounded-full text-sm transition-colors shadow hover:scale-105 transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={onClose}
              style={{
                backgroundColor: character.color,
                color: getContrastColor(character.color),
              }}
              aria-label="Fermer la fenêtre"
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}