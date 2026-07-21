"use client";

export function ToggleCompletedForm({
  action,
  id,
  userId,
  completed,
}: {
  action: (formData: FormData) => void;
  id: string;
  userId: string;
  completed: boolean;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="completed" value={String(completed)} />
      <button
        type="submit"
        className={`text-xs font-semibold rounded-full px-3 py-1 transition-colors ${
          completed
            ? "bg-performance-green/15 text-performance-green-dark"
            : "bg-fog text-[#8493ab] hover:bg-black/10"
        }`}
      >
        {completed ? "Concluído" : "Por realizar"}
      </button>
    </form>
  );
}
