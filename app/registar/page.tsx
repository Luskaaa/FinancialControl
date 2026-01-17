"use client";

import { useState } from "react";
import { message } from "antd";
import ExpenseForm from "@/app/components/expense-form/ExpenseForm";
import { ExpenseFormValues } from "@/types";

export default function RegistarPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ExpenseFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Erro ao guardar");

      message.success("Gasto registado com sucesso!");
    } catch (error) {
      console.error(error);
      message.error("Erro ao registar gasto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-4 md:col-start-2 md:col-span-6 xl:col-start-4 xl:col-span-6 bg-zinc-900 shadow-lg p-4 rounded-2xl">
      <div className="flex justify-center">
        <h1 className="text-white text-2xl font-bold mb-4">Registar Gasto</h1>
      </div>
      <ExpenseForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
