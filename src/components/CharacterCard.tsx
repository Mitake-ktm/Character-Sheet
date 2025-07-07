import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Modal from "./Modal"
import type { characters } from "../data/characters"

type Props = {
  character: typeof characters[0]
}

export function CharacterCard({ character }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  return (
    <>
      <div
      className="w-72 h-96 perspective border-2 rounded-2xl cursor-pointer transition-shadow duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped(!flipped)}
      ref={cardRef}
      style={{
        borderColor: character.color,
        boxShadow: `0 0 0 rgba(0,0,0,0)`,
      }}
      onMouseEnter={() => {
        if (cardRef.current)
          cardRef.current.style.boxShadow = `0 0 25px ${character.color}`
      }}
    >

        <motion.div
          animate={{
            rotateX: rotate.x,
            rotateY: (flipped ? 180 : 0) + rotate.y,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Face */}
          <div className="absolute w-full h-full bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-4 backface-hidden flex flex-col items-center justify-center">
            <img src={character.image} alt={character.name} className="w-24 h-24 rounded-full object-cover" />
            <h2 className="text-xl mt-4 font-bold">{character.name}</h2>
            <p className="text-sm text-purple-600 dark:text-purple-400">{character.title}</p>
            <p className="mt-4 italic text-center">« {character.quote} »</p>
          </div>

          {/* Back Face */}
          <div className="absolute w-full h-full bg-purple-100 dark:bg-neutral-900 rounded-2xl shadow-xl p-4 rotate-y-180 backface-hidden flex flex-col justify-between">
            <div>
              <p className="text-sm text-center">{character.description}</p>
              <ul className="mt-4 text-sm">
                <li>Âge : {character.details.age}</li>
                <li>Taille : {character.details.size}</li>
                <li>Personnalité : {character.details.personnality.join(", ")}</li>
              </ul>
            </div>
            <button
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowModal(true)
              }}
            >
              Voir plus
            </button>
          </div>
        </motion.div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-2">{character.name}</h2>
        <p className="mb-4">{character.description}</p>
        <ul className="text-sm space-y-1">
          <li><strong>Âge :</strong> {character.details.age}</li>
          <li><strong>Taille :</strong> {character.details.size}</li>
          <li><strong>Personnalité :</strong> {character.details.personnality.join(", ")}</li>
        </ul>
      </Modal>
    </>
  )
}
