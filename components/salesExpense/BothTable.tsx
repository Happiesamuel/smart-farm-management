import BothTableHeader from "./BothTableHeader";

export default function BothTable({ arrayOne }: { arrayOne: string[] }) {
  return (
    <div>
      <BothTableHeader arrayOne={arrayOne} />
    </div>
  );
}
