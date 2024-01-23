import Carousel from './Carousel';

const filterValid = (contents) => {
    return contents.filter(content => content.isValid === true);
};

export default function CarouselContainer({contents, CarouselComponent}) {
    const maxContentPerPage = 6;
    const contentGroups = [];
    const useFilterValid = Object.keys(contents[0]).includes('isValid');
    const contentValid = useFilterValid? filterValid(contents) : contents; // array of valid badges


    // Slice badgesValid into chunks of maxBadgesPerBox.
    for(let i=0;i<contentValid.length;i+=maxContentPerPage){
        contentGroups.push(contentValid.slice(i, i+maxContentPerPage));
    }

    return(
        <Carousel contents={contentGroups} CarouselComponent={CarouselComponent}></Carousel>
    )

};