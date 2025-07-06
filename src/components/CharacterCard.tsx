import { motion } from "framer-motion"
import { useState } from "react"

type Props = {
  character: typeof import("../data/characters").characters[0]
}

export function CharacterCard({ character }: Props) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="w-72 h-96 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Face avant */}
        <div className="absolute w-full h-full bg-white/90 dark:bg-neutral-800/90 border border-purple-200 dark:border-purple-800 rounded-2xl shadow-2xl p-4 backface-hidden flex flex-col items-center justify-center">
          <img src={character.image} alt={character.name} className="w-24 h-24 rounded-full object-cover border-4 border-purple-300 dark:border-purple-600" />
          <h2 className="text-2xl mt-4 font-bold text-purple-700 dark:text-purple-300 tracking-wide">{character.name}</h2>
          <p className="text-sm text-purple-600 dark:text-purple-400 italic">{character.title}</p>
          <p className="mt-4 italic text-center px-2 text-neutral-700 dark:text-neutral-300">« {character.quote} »</p>
        </div>

        {/* Face arrière */}
        <div className="absolute w-full h-full bg-purple-100 dark:bg-neutral-900 border border-purple-200 dark:border-purple-800 rounded-2xl shadow-2xl p-4 rotate-y-180 backface-hidden flex flex-col justify-center">
          <p className="text-sm text-center italic text-neutral-800 dark:text-neutral-200">{character.description}</p>
          <ul className="mt-4 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
            <li><strong>Âge :</strong> {character.details.age}</li>
            <li><strong>Taille :</strong> {character.details.size}</li>
            <li><strong>Personnalité :</strong> {character.details.personnality.join(", ")}</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
