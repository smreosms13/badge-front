import BadgeContainer from "./ui/main/BadgeContainer";
import BtnNav from "./ui/BtnNav";
import CardList from "./ui/CardList";
import VoucherList from "./ui/main/VoucherList";

export default function Home() {
  const BadgeContainerName = '디지털 증명서'

  return (
    <main className="mx-auto max-w-sm h-dvh grid grid-col-3 gap-3 shadow-2xl p-6 bg-white">
      <BadgeContainer name={BadgeContainerName}></BadgeContainer>
      <BtnNav></BtnNav>
      <VoucherList></VoucherList>
    </main>
  );
}
