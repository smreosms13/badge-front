"use client"
import { Button } from "@/components/ui/button";

// 배지 관리하기의 카테고리 모음 컴포넌트
export default function CategoryContainer({ contents }) {
    return (
      <div className="flex flex-col mb-2">
        <div className="mb-2">
          <p className="text-lg">카테고리</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2 overflow-x-auto scrollbar-hide">
          {/* button을 이용하여 카테고리로 필터링 기능 추가 필요 */}
         {
          contents.map((category, index) => (
            <Button 
              key={`${category.subject}-${index}`} 
              variant="outline" 
              size="sm" 
              className="rounded-xl text-sm"
            >
              {category.subject}
            </Button>
          ))
         }
        </div>
      </div>
    );
  }