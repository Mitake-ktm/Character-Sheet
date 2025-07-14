import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Modal from "./Modal"
import type { characters } from "../data/characters"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

type Props = {
  character: typeof characters[0]
}

function getContrastColor(hex: string): string {
  const color = hex.replace("#", "")
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? "#000" : "#fff"
}

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
  const [showParticles, setShowParticles] = useState(false)
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
    setShowParticles(false)
  }

  const particlesInit = async (main: any) => {
    await loadFull(main)
  }

  return (
    <>
      <motion.div
        className="relative w-72 h-96 perspective rounded-3xl cursor-pointer overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setFlipped(!flipped)}
        ref={cardRef}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          border: `3px solid ${character.color}`,
          boxShadow: `0 0 0 rgba(0,0,0,0)`,
          backgroundImage: "linear-gradient(135deg, #f9c6d3 0%, #a3d5ff 100%)",
        }}
        onMouseEnter={() => {
          if (cardRef.current)
            cardRef.current.style.boxShadow = `0 0 20px ${character.color}`
          setShowParticles(true)
        }}
      >
        {showParticles && (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              background: { color: "transparent" },
              particles: {
                number: { value: character.particle?.number ?? 15 },
                size: { value: character.particle?.size ?? 3 },
                color: { value: character.color },
                move: { enable: true, speed: character.particle?.speed ?? 0.8 },
                opacity: { value: character.particle?.opacity ?? 0.4 },
                shape: { type: character.particle?.shape ?? "circle" },
              },
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        )}

        <motion.div
          animate={{
            rotateX: rotate.x,
            rotateY: (flipped ? 180 : 0) + rotate.y,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div className="absolute w-full h-full bg-white/90 dark:bg-neutral-900/90 rounded-2xl p-4 backface-hidden flex flex-col items-center justify-center z-10">
            <motion.img
              src={character.image}
              alt={character.name}
              className="w-24 h-24 rounded-full object-cover border-4"
              style={{ borderColor: character.color }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            />
            <motion.h2
              className="text-xl mt-4 font-bold font-['Zen_Maru_Gothic']"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {character.name}
            </motion.h2>
            <motion.p
              className="text-sm"
              style={{ color: character.color }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {character.title}
            </motion.p>
            <motion.p
              className="mt-4 italic text-center text-neutral-600 dark:text-neutral-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              « {character.quote} »
            </motion.p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full bg-gradient-to-tr from-purple-200 via-pink-200 to-blue-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-900 rounded-2xl p-4 rotate-y-180 backface-hidden flex flex-col justify-between z-10">
            <div className="text-sm text-neutral-800 dark:text-neutral-200">
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
            </div>
            <button
              className="mt-4 px-4 py-2 rounded-full text-sm transition-colors shadow"
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
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <motion.div
              className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl"
              style={{
                border: `2px solid ${character.color}`,
                boxShadow: `0 0 25px ${character.color}`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-2">{character.name}</h2>
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
              <div className="flex flex-wrap gap-2">
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
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
