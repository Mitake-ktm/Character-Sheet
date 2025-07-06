import { CharacterCard } from "./components/CharacterCard"
import { characters } from "./data/characters"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-4">
      <CharacterCard character={characters[0]} />
    </div>
  )
}
