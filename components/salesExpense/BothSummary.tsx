export default function BothSummary({
  arr,
  type,
}: {
  arr: { name: string; value: string }[];
  type: string;
}) {
  return (
    <div className="px-3 xl:mt-4 mt-16">
      <h2 className="text-dark/90 py-3 border-y border-border text-sm font-semibold">
        {type === "sale" ? "Top Crops by Revenue" : "Top Expense Categoies"}
      </h2>

      <div className="space-y-3 mt-4">
        {arr.map((a) => (
          <div
            key={a.name}
            className="flex items-center gap-2 justify-between text-sm font-medium text-dark/90"
          >
            <p>{a.name}</p>
            <p>{a.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
