import { characters } from "../data/characters";
import { CharacterCard } from "./CharacterCard";

export function CharactersList() {
  console.log("Personnages chargés:", characters);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center p-4">
      {characters.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-red-500">Aucun personnage chargé!</p>
          <p>Vérifiez le fichier de données</p>
        </div>
      ) : (
        characters.map((character) => (
          <CharacterCard 
            key={character.id} 
            character={character} 
          />
        ))
      )}
    </div>
  );
}