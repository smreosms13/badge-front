import BadgeContainer from "./ui/BadgeContainer";
import BtnNav from "./ui/BtnNav";
import ListBox from "./ui/ListBox";

export default function Home() {
  const BadgeContainerName = '디지털 증명서'
  const ListBoxName = '디지털 바우처'
  return (
    <main className="mx-auto max-w-sm h-dvh grid grid-col-3 gap-3 shadow-2xl p-6 bg-white">
      <BadgeContainer name={BadgeContainerName}></BadgeContainer>
      <BtnNav></BtnNav>
      <ListBox name={ListBoxName}></ListBox>
    </main>
  );
}
