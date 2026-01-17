import Link from "next/link";

export default function Header() {
  return (
    <header className="col-span-4 md:col-span-8 xl:col-span-12 py-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-600 cursor-pointer">
          Controle de Gastos
        </h1>
      </Link>
      <nav className="flex gap-4">
        <Link
          href="/registar"
          className="text-xl text-gray-900 font-bold hover:text-gray-600"
        >
          Registar
        </Link>
        <Link
          href="/consultar"
          className="text-xl text-gray-900 font-bold hover:text-gray-600"
        >
          Consultar
        </Link>
      </nav>
    </header>
  );
}
