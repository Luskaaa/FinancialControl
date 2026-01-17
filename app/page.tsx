import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <div className="col-span-4 md:col-start-2 md:col-span-6 xl:col-start-4 xl:col-span-6 bg-zinc-900 shadow-lg p-6 md:p-8 rounded-2xl">
      <div className="flex flex-col items-center gap-4 md:gap-6">
        <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
          Controle de Gastos
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2 md:mt-4 w-full sm:w-auto">
          <Link href="/registar" className="w-full sm:w-auto">
            <Button type="primary" size="large" className="w-full">
              Registar Gasto
            </Button>
          </Link>
          <Link href="/consultar" className="w-full sm:w-auto">
            <Button size="large" className="w-full">Consultar Gastos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
