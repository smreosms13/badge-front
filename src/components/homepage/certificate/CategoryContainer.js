"use client"
import Category from "./Category"

export default function CategoryContainer({ contents }) {
    return (
      <div className="flex flex-col mb-2">
        <div className="mb-2">
          <p className="text-lg">Category</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2 overflow-x-auto scrollbar-hide">
         {
          contents.map((categroy, index) => (
            <Category key={`${categroy.subject}-${index}`} content={categroy}></Category>
          ))
         }
        </div>
      </div>
    );
  }