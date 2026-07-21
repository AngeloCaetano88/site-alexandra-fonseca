"use client";

import { useRef } from "react";

export function StatusSelectForm({
  action,
  id,
  status,
  options,
  extraFields,
  className,
}: {
  action: (formData: FormData) => void;
  id: string;
  status: string;
  options: { value: string; label: string }[];
  extraFields?: Record<string, string>;
  className?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={action} ref={formRef}>
      <input type="hidden" name="id" value={id} />
      {extraFields &&
        Object.entries(extraFields).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
      <select
        name="status"
        defaultValue={status}
        onChange={() => formRef.current?.requestSubmit()}
        className={
          className ??
          "text-xs font-semibold rounded-full border-0 px-3 py-1.5 bg-fog text-navy focus:outline-none focus:ring-2 focus:ring-electric cursor-pointer"
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}
