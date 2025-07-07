import { CharactersList } from "./components/CharactersList"

export default function App() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <h1 className="text-3xl font-bold text-center py-8">Akai Sekai : Mike</h1>
      <h1 className="text-3xl font-bold text-center py-8">Personnages</h1>
      <CharactersList />
    </main>
  )
}
