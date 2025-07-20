import { motion } from "framer-motion";
import type { Character } from "../types";

type Props = {
  character: Character;
  flipped: boolean;
  isMobile: boolean;
  onFlip: () => void;
};

export const CardFront = ({ character, flipped, isMobile, onFlip }: Props) => (
  <div className="w-full h-full bg-white/90 dark:bg-neutral-900/90 rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden">
    <motion.img
      src={character.image}
      alt={character.name}
      className="w-24 h-24 rounded-full object-cover border-4 mb-4"
      style={{ 
        borderColor: character.color,
        boxShadow: `0 0 10px ${character.color}80`
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    />
    
    <motion.h2
      className="text-xl font-bold font-['Zen_Maru_Gothic'] text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {character.name}
    </motion.h2>
    
    <motion.p
      className="text-sm mt-1 text-center font-medium"
      style={{ 
        color: character.color,
        textShadow: `0 0 4px ${character.color}40`
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {character.title}
    </motion.p>
    
    {character.quote && (
      <motion.div
        className="mt-4 flex-grow overflow-auto flex items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <p className="italic text-center text-neutral-600 dark:text-neutral-300 px-2">
          « {character.quote} »
        </p>
      </motion.div>
    )}
    
    {(isMobile || flipped) && (
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onFlip();
        }}
        className="mt-auto px-3 py-1 text-sm rounded-full bg-white/90 dark:bg-neutral-800/90 text-black dark:text-white shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          border: `2px solid ${character.color}`,
          boxShadow: `0 0 12px ${character.color}`,
          transform: 'translateZ(20px)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
        aria-label="Retourner la carte"
        whileHover={{ 
          scale: 1.05,
          boxShadow: `0 0 15px ${character.color}`
        }}
        whileTap={{ scale: 0.95 }}
      >
        {flipped ? "Face avant" : "Face arrière"}
      </motion.button>
    )}
  </div>
);