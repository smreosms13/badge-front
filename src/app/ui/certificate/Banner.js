export default function Banner({content}){

    return(
      <div className="flex items-center flex-col w-full bg-cover mb-5">
        <div
          className="mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        >
          <div className="dark:!border-navy-700 absolute flex h-36 w-36 items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
            <img
              className="h-full w-full rounded-full"
              src={content.image}
              alt={content.name}
            />
          </div>
        </div>
      {/* Name and position */}
      <div className="mt-5 flex flex-col items-center">
        <h4 className="text-navy-700 text-xl font-bold dark:text-white">
          {content.name}
        </h4>
        <h5 className="text-base font-normal text-blue-600">{content.description}</h5>
      </div>
      <div className="ml-auto mt-5">
        <a 
          href={`https://sepolia.etherscan.io/`} //TODO - ${content.txHash}
          className="bg-blue-600 rounded-xl p-1 px-2 text-white font-bold"
        >NFT Detail</a>
      </div>
    </div>
    )
}