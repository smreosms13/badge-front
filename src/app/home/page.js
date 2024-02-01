"use client"


import BadgeContainer from "@/components/homepage/main/BadgeContainer";
import BtnNav from "@/components/homepage/main/BtnNav";
import VoucherList from "@/components/homepage/main/VoucherList";
import Header from "@/components/homepage/main/Header";

export default function Page() {

  const BadgeContainerName = '디지털 증명서';

  return (
    <main className="mx-auto max-w-sm h-dvh grid gap-3 shadow-2xl p-6 bg-white">
      <Header />
      <BadgeContainer name={BadgeContainerName} />
      <BtnNav/>
      <VoucherList />
    </main>
  );
}