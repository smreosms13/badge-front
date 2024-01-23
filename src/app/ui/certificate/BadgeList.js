export default function BadgeList({contents, CustomCard}) {
    const CardComponent = CustomCard;
    return(
        <div className="grid grid-cols-3 gap-2 h-80 overflow-y-scroll p-2 scrollbar-hide">
            {contents.map((content) => (
                <CardComponent key={content.subject} content={content}></CardComponent>
            ))}
        </div>
    )
};