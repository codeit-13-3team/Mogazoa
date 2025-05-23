export interface StatisticCardProps {
  value: string | number;
  label: string;
}

export default function StatisticCard({ value, label }: StatisticCardProps) {
  return (
    <section className="bg-black-400 rounded-xl border border-gray-200 py-4 sm:py-6 lg:py-[30px] px-4 sm:px-6 lg:px-[74px] h-[120px] sm:h-[190px] flex flex-col items-center justify-center">
      <div className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{value}</div>
      <div className="text-xs sm:text-sm text-gray-400">{label}</div>
    </section>
  );
}
