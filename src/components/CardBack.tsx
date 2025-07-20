import { getContrastColor, darkenColor } from '../utils/color';
import type { Character } from '../types';
import type { RefObject } from 'react';

type Props = {
  character: Character;
  openButtonRef: RefObject<HTMLButtonElement | null>;
  onOpenModal: (e: React.MouseEvent) => void;
};

export const CardBack = ({ character, openButtonRef, onOpenModal }: Props) => {
  const MAX_DESCRIPTION_LENGTH = 80;

  const truncatedDescription =
    character.description.length > MAX_DESCRIPTION_LENGTH
      ? character.description.slice(0, MAX_DESCRIPTION_LENGTH).trim() + '...'
      : character.description;

  return (
    <div className="w-full h-full bg-gradient-to-tr from-purple-200 via-pink-200 to-blue-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-900 rounded-2xl p-4 flex flex-col justify-between">
      <div className="text-neutral-800 dark:text-neutral-200 space-y-4">
        <p className="text-center">{truncatedDescription}</p>

        <div className="bg-white/30 dark:bg-black/20 rounded-xl p-4 space-y-4">
          <ul className="text-sm space-y-2">
            <li><span className="font-semibold">Âge :</span> {character.details.age}</li>
            <li><span className="font-semibold">Taille :</span> {character.details.size}</li>
          </ul>

          <div>
            <h3 className="font-bold mb-2">Personnalité :</h3>
            <div className="flex flex-wrap gap-2">
              {character.details.personnality.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1.5 text-xs rounded-full font-medium"
                  style={{
                    backgroundColor: character.color,
                    color: getContrastColor(character.color),
                    boxShadow: `0 2px 6px ${darkenColor(character.color, 0.3)}`
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        className={`mt-4 px-6 py-2.5 rounded-full text-sm font-medium transition-transform transition-shadow duration-200 ease-in-out shadow-lg transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 mx-auto`}
        ref={openButtonRef as RefObject<HTMLButtonElement>}
        onClick={onOpenModal}
        style={{
          backgroundColor: character.color,
          color: getContrastColor(character.color),
          border: `2px solid ${darkenColor(character.color, 0.2)}`,
          boxShadow: `0 4px 10px ${darkenColor(character.color, 0.3)}`
        }}
        aria-label={`En savoir plus sur ${character.name}`}
      >
        Voir plus
      </button>
    </div>
  );
};
