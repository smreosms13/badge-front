"use client"
import { useState, useEffect } from "react";

export default function Goshare() {

    const [selectedImages, setSelectedImages] = useState(() => {
        const savedItems = localStorage.getItem('selectedImages');
        console.log(savedItems);
        return savedItems ? JSON.parse(savedItems) : [];
      });

      useEffect(() => {
        console.log(selectedImages);
      }, []);
      




  return (
    <>
    g2</>
  );
}


