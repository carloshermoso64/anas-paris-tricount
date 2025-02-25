import { notFound } from "next/navigation";

export default function PaymentSuccess({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  if (!searchParams || typeof searchParams !== "object") {
    return notFound();
  }

  const amount = searchParams.amount ?? "0.00"; // Ensure valid fallback

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Tus huevos</h1>
        <h2 className="text-2xl">Si lees esto es que el pago ha salido bien rascabicho</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          €{amount}
        </div>
      </div>
    </main>
  );
}
