import { getContrastColor, darkenColor } from '../utils/color';
import type { Character } from '../types';
import type { RefObject } from 'react';

type Props = {
  character: Character;
  openButtonRef: RefObject<HTMLButtonElement | null>;
  onOpenModal: (e: React.MouseEvent) => void;
};

export const CardBack = ({ character, openButtonRef, onOpenModal }: Props) => (
  <div className="w-full h-full bg-gradient-to-tr from-purple-200 via-pink-200 to-blue-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-900 rounded-2xl p-4 flex flex-col">
    <div className="flex-1 overflow-y-auto">
      <p className="text-center">{character.description}</p>
      
      <ul className="mt-4 space-y-1">
        <li>Âge : {character.details.age}</li>
        <li>Taille : {character.details.size}</li>
      </ul>
      
      <div className="mt-2 flex flex-wrap gap-2">
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
      
      {character.details.skills && character.details.skills.length > 0 && (
        <div className="mt-4">
          <p className="font-medium">Compétences :</p>
          <ul className="list-disc list-inside mt-1">
            {character.details.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    
    <button
      className="mt-4 px-4 py-2 rounded-full text-sm transition-colors shadow hover:scale-105 transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
      ref={openButtonRef as RefObject<HTMLButtonElement>}
      onClick={onOpenModal}
      style={{
        backgroundColor: character.color,
        color: getContrastColor(character.color),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = darkenColor(character.color, 0.15);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = character.color;
      }}
      aria-label={`En savoir plus sur ${character.name}`}
    >
      Voir plus
    </button>
  </div>
);