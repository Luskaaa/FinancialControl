"use client";

import { useEffect, useState, useMemo } from "react";
import { Table, Tag, Spin, Button, Statistic, Menu } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Expense } from "@/types";
import { formatCurrency } from "@/utils";
import Link from "antd/es/typography/Link";

export default function ConsultarPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    } finally {
      setLoading(false);
    }
  };

  const availableMonths = useMemo(() => {
    const monthsMap = new Map<
      string,
      { month: number; year: number; label: string }
    >();

    expenses.forEach((expense) => {
      const date = new Date(expense.data);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!monthsMap.has(key)) {
        monthsMap.set(key, {
          month: date.getMonth(),
          year: date.getFullYear(),
          label: date.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          }),
        });
      }
    });

    return Array.from(monthsMap.entries()).sort((a, b) => {
      const [yearA, monthA] = a[0].split("-").map(Number);
      const [yearB, monthB] = b[0].split("-").map(Number);
      return yearB - yearA || monthB - monthA;
    });
  }, [expenses]);

  useEffect(() => {
    if (availableMonths.length > 0 && !selectedMonth) {
      setSelectedMonth(availableMonths[0][0]);
    }
  }, [availableMonths, selectedMonth]);

  const filteredExpenses = useMemo(() => {
    if (!selectedMonth) return expenses;

    const [year, month] = selectedMonth.split("-").map(Number);
    return expenses.filter((expense) => {
      const date = new Date(expense.data);
      return date.getMonth() === month && date.getFullYear() === year;
    });
  }, [expenses, selectedMonth]);

  const monthlyTotals = useMemo(() => {
    const selectedMonthData = availableMonths.find(
      ([key]) => key === selectedMonth,
    );

    return {
      totalEUR: filteredExpenses.reduce((sum, exp) => sum + exp.custoEUR, 0),
      totalBRL: filteredExpenses.reduce((sum, exp) => sum + exp.custoBRL, 0),
      count: filteredExpenses.length,
      monthName: selectedMonthData?.[1]?.label || "Sem dados",
    };
  }, [filteredExpenses, selectedMonth, availableMonths]);

  const columns: ColumnsType<Expense> = [
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Custo EUR",
      dataIndex: "custoEUR",
      key: "custoEUR",
      render: (value: number) => (
        <Tag color="blue">{formatCurrency(value, "EUR")}</Tag>
      ),
    },
    {
      title: "Custo BRL",
      dataIndex: "custoBRL",
      key: "custoBRL",
      render: (value: number) => (
        <Tag color="green">{formatCurrency(value, "BRL")}</Tag>
      ),
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      render: (value: string) =>
        new Date(value).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
  ];

  if (loading) {
    return (
      <div className="col-span-4 md:col-span-8 xl:col-span-12 flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="col-span-4 md:col-span-8 xl:col-span-12 flex gap-4">
      <div className="w-48 bg-zinc-900 text-white shadow-lg p-4 rounded-2xl ">
        <h2 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <CalendarOutlined /> Meses
        </h2>
        <Menu
          mode="vertical"
          selectedKeys={selectedMonth ? [selectedMonth] : []}
          onClick={({ key }) => setSelectedMonth(key)}
          items={availableMonths.map(([key, { label }]) => ({
            key,
            label: <span className="capitalize">{label}</span>,
          }))}
          style={{ backgroundColor: "transparent", color: "white" }}
        />
        {availableMonths.length === 0 && (
          <p className="text-gray-400 text-sm">Nenhum gasto registado</p>
        )}
      </div>

      <div className="flex-1 bg-zinc-900 shadow-lg p-4 rounded-2xl">
        <div className="flex justify-center mb-4">
          <h1 className="text-white text-2xl font-bold capitalize">
            Gastos de {monthlyTotals.monthName}
          </h1>
        </div>
        <Table
          dataSource={filteredExpenses}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="expense-table"
        />

        <div className="mt-4 bg-zinc-800 border-zinc-700 flex flex-col p-4 rounded-lg">
          <h2 className="text-white text-lg font-semibold mb-4 capitalize text-center">
            Total de {monthlyTotals.monthName}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <Statistic
              title={<span className="text-gray-400">Gastos</span>}
              value={monthlyTotals.count}
              styles={{
                content: {
                  color: "#fff",
                },
              }}
            />
            <Statistic
              title={<span className="text-gray-400">Total EUR</span>}
              value={monthlyTotals.totalEUR}
              precision={2}
              prefix="€"
              styles={{
                content: {
                  color: "#1890ff",
                },
              }}
            />
            <Statistic
              title={<span className="text-gray-400">Total BRL</span>}
              value={monthlyTotals.totalBRL}
              precision={2}
              prefix="R$"
              styles={{
                content: {
                  color: "#1890ff",
                },
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <Link href="/">
            <Button size="large" htmlType="button">
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
