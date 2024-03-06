import Image from "next/image";
// User Guide contents

// service 소개
const serviceIntro = (
    <div className="p-1 flex flex-col aspect-square items-center text-center font-bold">
    <div className="mb-2">
        <h1 className="text-2xl text-red-500">
            Make your own!
        </h1>
    </div>
    <Image src="/guide/koreaTiger.png" width={200} height={200} alt="My Data Badges"/>
    <div className="mt-2">
        <p className="">
            디지털 배지를 통해 <br/>
            온오프라인 어디서든 이력을 증명하세요! <br/>
        </p>
        <p className="mt-3 text-sm font-medium text-gray-500">© 2024 IBEL & Dao Solution</p>
    </div>
</div>
)

// 메인페이지 - 내 보관함
const myBadgeContainer = (
    <div className="p-1 flex flex-col aspect-square items-center text-center">
        <div className="mb-3">
            <h1 className="text-xl font-semibold">내 보관함</h1>
            <Image src="/guide/badgeContainer.png" width={300} height={200} alt="My Data Badges"/>
        </div>
        <p>
            보유한 디지털 배지를 확인할 수 있어요 <br/>
            배지를 클릭하면 자세한 정보를 볼 수 있어요 <br/>
            검증된 배지는 인증 마크가 붙어요
        </p>
    </div>
);

// 메인 - 배지 만들기, 공유하기, 관리하기 버튼
const btnNav = (
    <div className="p-1 flex-col aspect-square jutify-center items-center text-center">
        <div className="mb-5">
            <h1 className="text-lg font-semibold">네비게이션</h1>
            <p>
                버튼을 눌러 배지 만들기, 공유하기, <br></br>
                관리하기를 진행할 수 있어요
            </p>
        </div>
        <Image src="/guide/btnNav.jpg" width={300} height={200} alt="My Data Badges"/>
    </div>
);

// 메인 - 디지털바우처 리스트
const voucherList = (
    <div className="p-1 flex flex-col aspect-square items-center text-center">
        <div className="mb-5">
            <h1 className="text-lg font-semibold">디지털 바우처(개발 예정)</h1>
            <p>
                보유한 배지에 따라 여러 혜택이 담긴 <br/>
                디지털 바우처를 받아볼 수 있어요
            </p>
        </div>
        <Image src="/guide/voucherList.jpg" width={300} height={200} alt="My Data Badges"/>
    </div>
);

// 배지 만들기
const badgeIssue = (
    <div className="p-1 flex aspect-square justify-center text-center ">
        <div className="mb-5 flex flex-col justify-center">
            <h1 className="text-lg font-semibold">배지 만들기</h1>
            <p>
                배지 정보를 입력해 <br/>
                나만의 배지를<br/>
                만들어보세요
            </p>
        </div>   
        <Image src="/guide/issue.png" width={180} height={200} alt="My Data Badges"></Image>
             
    </div>
);

// 배지 공유하기 1 - 공유할 배지 선택
const badgeShare = (
    <div className="flex aspect-square justify-center text-center ">
        <div className="mb-5 flex flex-col justify-center">
            <h1 className="text-lg font-semibold">배지 공유하기</h1>
            <p>
                공유할 배지를 선택해 <br/>
                나만의 배지 컬렉션을 <br/>
                구성할 수 있어요 <br/>                
            </p>
        </div>        
        <Image src="/guide/share.png" width={150} height={200} alt="My Data Badges"></Image>
    </div>
);

// 배지 공유하기 2 -  컬렉션 이름 입력 및 URL 복사
const colletionPost = (
    <div className="flex aspect-square justify-center text-center ">
        <div className="mb-5 flex flex-col justify-center">
            <h1 className="text-lg font-semibold">컬렉션 완성하기</h1>
            <p>
                컬렉션 이름을 입력하면 <br/>
                나만의 배지 컬렉션이 <br/>
                완성됩니다              
            </p>
            <p className="mt-3">
                아래 버튼을 눌러 <br/>
                완성된 컬렉션 URL을<br/>
                복사할 수 있어요 <br/>               
            </p>
        </div>        
        <Image src="/guide/collection.png" width={150} height={200} alt="My Data Badges"></Image>
    </div>
)

// 공유한 배지 컬렉션 페이지
const showpage = (
    <div className="flex aspect-square justify-center text-center ">
        <div className="mb-5 flex flex-col justify-center mr-3">
            <h1 className="text-lg font-semibold">나의 이력 증명하기</h1>
            <p>
                나의 컬렉션 URL을 <br/>
                SNS에 등록해보세요      
            </p>
        </div>        
        <Image src="/guide/showpage.png" width={160} height={200} alt="My Data Badges"></Image>
    </div>
)

export const guideContents = [
    serviceIntro,
    myBadgeContainer, 
    btnNav, 
    voucherList, 
    badgeIssue, 
    badgeShare,
    colletionPost,
    showpage,
]


