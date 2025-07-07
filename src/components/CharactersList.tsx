import { characters } from "../data/characters"
import { CharacterCard } from "./CharacterCard"

export function CharactersList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center p-4">
      {characters.map((character, index) => (
        <CharacterCard key={index} character={character} />
      ))}
    </div>
  )
}
