"use client";

export function DeleteButton({
  action,
  id,
  extraFields,
  confirmMessage,
  label = "Eliminar",
  className,
}: {
  action: (formData: FormData) => void;
  id: string;
  extraFields?: Record<string, string>;
  confirmMessage: string;
  label?: string;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      {extraFields &&
        Object.entries(extraFields).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
      <button
        type="submit"
        className={
          className ??
          "text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
        }
      >
        {label}
      </button>
    </form>
  );
}
