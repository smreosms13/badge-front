"use client"
import Category from "./Category"
import CarouselContainer from "@/components/ui/CarouselContainer";

export default function CategoryContainer({ contents }) {
    return (
      <div className="flex flex-col p-2">
        <div className="mb-2">
          <p className="text-lg">Category</p>
        </div>
        <CarouselContainer contents={contents} CarouselComponent={Category} />
      </div>
    );
  }