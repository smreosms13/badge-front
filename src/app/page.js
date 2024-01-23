import BadgeContainer from "./ui/main/BadgeContainer";
import BtnNav from "./ui/BtnNav";
import VoucherList from "./ui/main/VoucherList";
import Header from "./ui/main/Header";

export default function Home() {
  const BadgeContainerName = '디지털 증명서'

  return (
    <main className="mx-auto max-w-sm h-dvh grid gap-3 shadow-2xl p-6 bg-white">
      <Header></Header>
      <BadgeContainer name={BadgeContainerName}></BadgeContainer>
      <BtnNav></BtnNav>
      <VoucherList></VoucherList>
    </main>
  );
}
