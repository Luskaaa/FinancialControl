import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <div className="col-span-4 md:col-start-2 md:col-span-6 xl:col-start-4 xl:col-span-6 bg-zinc-900 shadow-lg p-8 rounded-2xl">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-white text-3xl font-bold text-center">
          Controle de Gastos
        </h1>
        <div className="flex gap-4 mt-4">
          <Link href="/registar">
            <Button type="primary" size="large">
              Registar Gasto
            </Button>
          </Link>
          <Link href="/consultar">
            <Button size="large">Consultar Gastos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
