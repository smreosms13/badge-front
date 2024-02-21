"use client"
import Imageselector from "./selectone";

export default function Page() {
  if (localStorage.getItem('selectedImages')) {
    localStorage.removeItem('selectedImages');
  }
  
  return (
    <Imageselector/>
  );
}
