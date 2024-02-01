import Card from "./Card"
export default function CardList({name, contents, CustomCard}) {
    const CardComponent = CustomCard ? CustomCard : Card;
    return(
        <div className="flex flex-col overflow-y-scroll scrollbar-hide">
            {name && (
                <div className="my-3 font-medium text-lg">
                    <p>{name}</p>
                </div>
            )}
            <div className="h-64 overflow-y-scroll p-2 scrollbar-hide">
                {contents.map((content) => (
                    <CardComponent key={content.subject} content={content}></CardComponent>
                ))}
            </div>
        </div>   
    )
};