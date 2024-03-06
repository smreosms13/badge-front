"use client"
import BadgeSelector from "@/components/homepage/certificate/BadgeSelector";

// 공유할 배지 선택을 위한 페이지
export default function Page() {
  // 로컬스토리지 초기화
  if (localStorage.getItem('selectedImages')) {
    localStorage.removeItem('selectedImages');
  }
  return (
    <BadgeSelector/>
  );
}
