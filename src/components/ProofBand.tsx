import { proofStats } from "@/content/pages";

export function ProofBand() {
  return (
    <div className="proof-band">
      {proofStats.map((stat) => (
        <div key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
