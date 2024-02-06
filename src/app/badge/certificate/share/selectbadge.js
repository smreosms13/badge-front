import BadgeList from "../../../../components/homepage/certificate/BadgeList";

export default function Page() {
    const onImageClick = (imageInfo) => {
        setImages(prevImages => [...prevImages, imageInfo]);
      };


  return (
    <BadgeList onClick = {onImageClick}/>
  );
}