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
      style={{ borderColor: character.color }}
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
      className="text-sm mt-1 text-center"
      style={{ color: character.color }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {character.title}
    </motion.p>
    
    {character.quote && (
      <motion.p
        className="mt-4 italic text-center text-neutral-600 dark:text-neutral-300 px-2 flex-grow overflow-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        « {character.quote} »
      </motion.p>
    )}
    
    {(isMobile || flipped) && (
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onFlip();
        }}
        className="mt-auto px-3 py-1 text-sm rounded-md bg-white/80 dark:bg-neutral-800/80 text-black dark:text-white shadow hover:bg-white dark:hover:bg-neutral-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          border: `1px solid ${character.color}`,
          boxShadow: `0 0 8px ${character.color}80`
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
        aria-label="Retourner la carte"
      >
        {flipped ? "Face avant" : "Face arrière"}
      </motion.button>
    )}
  </div>
);