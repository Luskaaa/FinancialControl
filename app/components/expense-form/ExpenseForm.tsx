"use client";

import { useState } from "react";
import { Form, Input, InputNumber, Button, DatePicker, Switch } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { ExpenseFormValues } from "@/types";
import { normalizeNumber, normalizeText } from "@/utils";
import {
  FORM_RULES,
  DATE_FORMAT,
  CURRENCY_SYMBOLS,
  VALIDATION_MESSAGES,
} from "@/constants";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";

interface ExpenseFormProps {
  onSubmit: (values: ExpenseFormValues) => void;
  loading?: boolean;
}

export default function ExpenseForm({ onSubmit, loading }: ExpenseFormProps) {
  const [form] = Form.useForm<ExpenseFormValues>();
  const [isParcelado, setIsParcelado] = useState(false);

  const handleFinish = (values: ExpenseFormValues) => {
    onSubmit({
      ...values,
      parcelado: isParcelado,
      numeroParcelas: isParcelado ? values.numeroParcelas : undefined,
    });
    form.resetFields();
    setIsParcelado(false);
  };

  const setToday = () => {
    form.setFieldsValue({ data: dayjs() });
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      validateTrigger={["onBlur", "onChange"]}
    >
      <Form.Item
        name="custoEUR"
        rules={[
          {
            type: "number",
            min: FORM_RULES.minCurrencyValue,
            message: VALIDATION_MESSAGES.minValue,
          },
        ]}
        normalize={normalizeNumber}
      >
        <InputNumber
          placeholder="Custo em EUR"
          className="w-full! h-15"
          size="large"
          prefix={CURRENCY_SYMBOLS.EUR}
          precision={2}
          min={0}
          controls={false}
          decimalSeparator=","
        />
      </Form.Item>
      <Form.Item
        name="custoBRL"
        rules={[
          {
            type: "number",
            min: FORM_RULES.minCurrencyValue,
            message: VALIDATION_MESSAGES.minValue,
          },
        ]}
        normalize={normalizeNumber}
      >
        <InputNumber
          placeholder="Custo em R$"
          className="w-full! h-15"
          size="large"
          prefix={CURRENCY_SYMBOLS.BRL}
          precision={2}
          min={0}
          decimalSeparator=","
          controls={false}
        />
      </Form.Item>
      <Form.Item
        name="data"
        rules={[{ required: true, message: "Por favor, selecione a data" }]}
      >
        <DatePicker
          showTime={false}
          placeholder="Data"
          className="w-full h-15"
          size="large"
          format={DATE_FORMAT}
        />
      </Form.Item>
      <Form.Item
        name="descricao"
        rules={[
          { required: true, message: "Por favor, insira uma descrição" },
          {
            min: FORM_RULES.descricaoMinLength,
            message: VALIDATION_MESSAGES.minLength(
              FORM_RULES.descricaoMinLength,
            ),
          },
          {
            max: FORM_RULES.descricaoMaxLength,
            message: VALIDATION_MESSAGES.maxLength(
              FORM_RULES.descricaoMaxLength,
            ),
          },
          {
            pattern: /^[a-zA-ZÀ-ÿ0-9\s.,!?:\-\n]+$/,
            message: VALIDATION_MESSAGES.invalidCharacters,
          },
        ]}
        normalize={normalizeText}
      >
        <TextArea
          rows={5}
          placeholder="Descrição"
          size="large"
          maxLength={FORM_RULES.descricaoMaxLength}
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Form.Item>
      <div className="bg-zinc-800 p-4 rounded-lg mb-6 flex flex-col gap-5">
        <div className="flex items-center justify-between ">
          <span className="text-white">Pagamento parcelado?</span>
          <Switch
            checked={isParcelado}
            onChange={(checked) => {
              setIsParcelado(checked);
              if (!checked) {
                form.setFieldsValue({ numeroParcelas: undefined });
              }
            }}
          />
        </div>
        {isParcelado && (
          <Form.Item
            name="numeroParcelas"
            rules={[
              {
                required: isParcelado,
                message: "Informe o número de parcelas",
              },
            ]}
          >
            <InputNumber
              placeholder="Número de parcelas"
              className="w-full! "
              size="large"
              min={2}
              max={48}
              controls={true}
              precision={0}
            />
          </Form.Item>
        )}
      </div>
      <Form.Item>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <Link href="/consultar" className="order-2 sm:order-1">
            <Button size="large" htmlType="button" className="w-full">
              Consultar
            </Button>
          </Link>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            className="w-full order-1 sm:order-2"
          >
            Registar
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
