import TicTacToe from '@/app/components/ticTacToe';

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8 text-gray-800">
         Tic Tac Toe Game
      </h1>
      <TicTacToe />
    </main>
  );
}