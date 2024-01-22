import Carousel from './Carousel';

const filterValid = (contents) => {
    return contents.filter(content => content.isVaild === true);
};


export default function CarouselContainer({contents}) {
    const maxContentPerPage = 6;
    const contentGroups = [];
    const contentValid = filterValid(contents); // array of valid badges

    // Slice badgesValid into chunks of maxBadgesPerBox.
    for(let i=0;i<contentValid.length;i+=maxContentPerPage){
        contentGroups.push(contentValid.slice(i, i+maxContentPerPage));
    }

    return(
        <Carousel contents={contentGroups}></Carousel>
    )

};