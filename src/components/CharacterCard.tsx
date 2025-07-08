import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Modal from "./Modal"
import type { characters } from "../data/characters"

type Props = {
  character: typeof characters[0]
}

// automatically determine a readable text color
function getContrastColor(hex: string): string {
  const color = hex.replace("#", "")
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? "#000" : "#fff"
}

// darken background color on hover
function darkenColor(hex: string, amount: number): string {
  const color = hex.replace("#", "")
  const num = parseInt(color, 16)
  const r = Math.max(0, (num >> 16) - amount * 255)
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount * 255)
  const b = Math.max(0, (num & 0x0000ff) - amount * 255)
  return `rgb(${r}, ${g}, ${b})`
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
          {/* Front side */}
          <div className="absolute w-full h-full bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-4 backface-hidden flex flex-col items-center justify-center">
            <img src={character.image} alt={character.name} className="w-24 h-24 rounded-full object-cover" />
            <h2 className="text-xl mt-4 font-bold">{character.name}</h2>
            <p className="text-sm" style={{ color: character.color }}>{character.title}</p>
            <p className="mt-4 italic text-center">« {character.quote} »</p>
          </div>

          {/* Back side */}
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
              className="mt-4 px-4 py-2 rounded-lg text-sm transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setShowModal(true)
              }}
              style={{
                backgroundColor: character.color,
                color: getContrastColor(character.color),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darkenColor(character.color, 0.15)
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = character.color
              }}
            >
              Voir plus
            </button>
          </div>
        </motion.div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <div
    className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow-xl"
    style={{
      border: `2px solid ${character.color}`,
      boxShadow: `0 0 20px ${character.color}`,
    }}
  >
    <h2 className="text-xl font-bold mb-2">{character.name}</h2>
    <p className="mb-4">{character.description}</p>
    <ul className="text-sm space-y-1">
      <li><strong>Âge :</strong> {character.details.age}</li>
      <li><strong>Taille :</strong> {character.details.size}</li>
      <li><strong>Personnalité :</strong> {character.details.personnality.join(", ")}</li>
    </ul>
  </div>
</Modal>

    </>
  )
}
