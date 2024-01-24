

export default function Category({content}) {
    return(
        <button className="rounded-3xl border text-center text-md">
            <p>{content.subject}</p>
        </button>
    )
}
