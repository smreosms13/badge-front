

export default function Category({content}) {
    return(
        <button key={content.index} className="rounded-3xl border text-center text-md">
            <p>{content.subject}</p>
        </button>
    )
}
