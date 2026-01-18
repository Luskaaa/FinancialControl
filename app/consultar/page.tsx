"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Table,
  Tag,
  Spin,
  Button,
  Statistic,
  Select,
  message,
  Popconfirm,
  Input,
} from "antd";
import { CalendarOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Expense } from "@/types";
import { formatCurrency } from "@/utils";
import Link from "antd/es/typography/Link";

export default function ConsultarPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    let filtered = expenses;

    // Filtrar por mês
    if (selectedMonth) {
      const [year, month] = selectedMonth.split("-").map(Number);
      filtered = filtered.filter((expense) => {
        const date = new Date(expense.data);
        return date.getMonth() === month && date.getFullYear() === year;
      });
    }

    // Filtrar por termo de pesquisa
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((expense) =>
        expense.descricao.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [expenses, selectedMonth, searchTerm]);

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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/expenses?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir");

      setExpenses(expenses.filter((exp) => exp.id !== id));
      message.success("Gasto excluído com sucesso!");
    } catch (error) {
      console.error(error);
      message.error("Erro ao excluir gasto");
    }
  };

  const columns: ColumnsType<Expense> = [
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      ellipsis: { showTitle: true },
      fixed: "left" as const,
      width: 100,
    },
    {
      title: "EUR",
      dataIndex: "custoEUR",
      key: "custoEUR",
      width: 90,
      align: "center" as const,
      render: (value: number) => (
        <Tag color="blue">{formatCurrency(value, "EUR")}</Tag>
      ),
    },
    {
      title: "BRL",
      dataIndex: "custoBRL",
      key: "custoBRL",
      width: 95,
      align: "center" as const,
      render: (value: number) => (
        <Tag color="green">{formatCurrency(value, "BRL")}</Tag>
      ),
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      width: 90,
      align: "center" as const,
      render: (value: string) =>
        new Date(value).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "",
      key: "actions",
      width: 50,
      align: "center" as const,
      render: (_, record) => (
        <Popconfirm
          title="Excluir gasto"
          description="Tens a certeza que queres excluir este gasto?"
          onConfirm={() => handleDelete(record.id)}
          okText="Sim"
          cancelText="Não"
          okButtonProps={{ danger: true }}
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
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
    <div className="col-span-4 md:col-span-8 xl:col-span-12 flex flex-col lg:flex-row gap-3 md:gap-4 h-full max-h-full overflow-hidden">
      {/* Mobile/Tablet: Dropdown selector */}
      <div className="lg:hidden bg-zinc-900 text-white shadow-lg p-3 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <CalendarOutlined />
          <span className="font-semibold">Selecionar Mês</span>
        </div>
        <Select
          className="w-full"
          size="large"
          value={selectedMonth}
          onChange={(value) => setSelectedMonth(value)}
          options={availableMonths.map(([key, { label }]) => ({
            value: key,
            label: <span className="capitalize">{label}</span>,
          }))}
          placeholder="Selecione um mês"
        />
      </div>

      <div className="hidden lg:block w-48 bg-zinc-900 text-white shadow-lg p-4 rounded-2xl shrink-0">
        <h2 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <CalendarOutlined /> Meses
        </h2>
        <div className="flex flex-col gap-1">
          {availableMonths.map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setSelectedMonth(key)}
              className={`text-left px-3 py-2 rounded-lg capitalize transition-colors ${
                selectedMonth === key
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-zinc-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {availableMonths.length === 0 && (
          <p className="text-gray-400 text-sm">Nenhum gasto registado</p>
        )}
      </div>

      <div className="flex-1 bg-zinc-900 shadow-lg p-3 md:p-4 rounded-xl md:rounded-2xl min-w-0 overflow-hidden flex flex-col">
        <div className="flex justify-center mb-3 md:mb-4">
          <h1 className="text-white text-lg md:text-2xl font-bold capitalize text-center truncate">
            Gastos de {monthlyTotals.monthName}
          </h1>
        </div>
        <div className="mb-3 md:mb-4">
          <Input
            placeholder="Pesquisar por descrição..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            size="large"
            className="search-input"
          />
        </div>
        <div className="overflow-auto flex-1 min-h-0">
          <Table
            dataSource={filteredExpenses}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 9, placement: ["bottomCenter"] }}
            className="expense-table"
            size="small"
            scroll={{ x: 300 }}
          />
        </div>

        <div className="mt-auto pt-3 md:pt-4 bg-zinc-800 border-zinc-700 flex flex-col p-3 md:p-4 rounded-lg shrink-0">
          <h2 className="text-white text-sm md:text-lg font-semibold mb-3 md:mb-4 capitalize text-center">
            Total de {monthlyTotals.monthName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <Statistic
              title={
                <span className="text-gray-400 text-xs md:text-sm">Gastos</span>
              }
              value={monthlyTotals.count}
              styles={{
                content: {
                  color: "#fff",
                  fontSize: "1.25rem",
                },
              }}
            />
            <Statistic
              title={
                <span className="text-gray-400 text-xs md:text-sm">
                  Total EUR
                </span>
              }
              value={monthlyTotals.totalEUR}
              precision={2}
              prefix="€"
              styles={{
                content: {
                  color: "#1890ff",
                  fontSize: "1.25rem",
                },
              }}
            />
            <Statistic
              title={
                <span className="text-gray-400 text-xs md:text-sm">
                  Total BRL
                </span>
              }
              value={monthlyTotals.totalBRL}
              precision={2}
              prefix="R$"
              styles={{
                content: {
                  color: "#1890ff",
                  fontSize: "1.25rem",
                },
              }}
            />
          </div>
        </div>

        <div className="mt-3 md:mt-4">
          <Link href="/">
            <Button size="large" htmlType="button" className="w-full sm:w-auto">
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
