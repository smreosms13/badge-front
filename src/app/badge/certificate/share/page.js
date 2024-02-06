"use client"
import BadgeList from "../../../../components/homepage/certificate/BadgeList";
import SelectBadge from "./selectbadge";
import { useState } from "react";

export default function Page() {
    const [images, setImages] = useState([]);
    const onImageClick = (imageInfo) => {
        setImages(prevImages => [...prevImages, imageInfo]);
      };


  return (
    <>
        <SelectBadge onImageClick={onImageClick}/>
    </>
  );
}
