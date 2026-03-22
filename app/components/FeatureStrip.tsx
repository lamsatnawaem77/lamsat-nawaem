import {
  BadgePercent,
  CreditCard,
  ShieldCheck,
  Truck,
} from "lucide-react";

const items = [
  {
    title: "شحن مجاني",
    desc: "للطلبات فوق 199 ر.س",
    icon: Truck,
  },
  {
    title: "أسعار مميزة",
    desc: "خصومات يومية على منتجات مختارة",
    icon: BadgePercent,
  },
  {
    title: "دفع آمن",
    desc: "خيارات دفع متعددة وآمنة",
    icon: CreditCard,
  },
  {
    title: "جودة موثوقة",
    desc: "منتجات مختارة بعناية",
    icon: ShieldCheck,
  },
];

export default function FeatureStrip() {
  return (
    <section className="rounded-[28px] bg-[#efe5dd] p-3 shadow-sm lg:p-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-[#f6eee8] p-3 text-right lg:p-4"
            >
              <div className="flex items-center justify-end gap-2 text-[#6d2e1f]">
                <span className="text-sm font-bold lg:text-base">
                  {item.title}
                </span>
                <Icon size={18} />
              </div>

              <p className="mt-2 text-xs leading-5 text-neutral-600 lg:text-sm">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}