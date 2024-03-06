"use client"
import { useState, useRef } from 'react';
import { useAuth } from '@/context/Context';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAccount } from 'wagmi';
import { storage } from '@/service/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button"
import { Input, Select } from '@/components/ui/input-select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { 
    ArrowUpTrayIcon, 
    ArrowPathIcon, 
    CheckIcon, 
    ExclamationTriangleIcon 
} from "@heroicons/react/24/outline"

// gender select options
const genderOptions = [
    { value:"M", disabled: false },
    { value:"F", disabled: false },
    { value:"X", disabled: false },
]; 

// category select options
const categoryOptions = [
    { value:"이력", disabled: false },
    { value:"건강", disabled: true  },
    { value:"게임", disabled: true  },
    { value:"신용", disabled: true  },
]; 

// badge type options
const badgeTypeOptions = [
    { value:"Standard", disabled: false },
    { value:"NFT", disabled: false },
    { value:"Utility", disabled: false }
]

// 배지 생성을 위한 컴포넌트
export default function IssueBadge() {
    const { currentUser } = useAuth();
    const { account } = useAccount();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedfile, setSelectedFile] = useState(null)
    const [image, setImage] = useState(null)
    const [section, setSection] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState({})

    // api body default value
    //level, topic, skills, grade가 없어도록 Create 가능하도록 API(CreateABadge) 수정 필요. 
    const dataDefault = { 
        userId: currentUser?.uid,
        walletAddress: "", 
        walletSignature:"", // wagmi + rainbowkit
        name: currentUser?.displayName,
        email: currentUser?.email,
        affiliation:"고려대학교",  // (prototype - defalt=고려대학교)
        gender:"",
        birthdate:"",
        image: "",
        badgeName: "",
        category:"이력",     // 이력, 건강, 게임, 신용, (prototype - defalt=이력)
        badgetype:"",       // Standard , NFT, Utilities etc ...
        subject: "",
        description: "",
        
        // 이하 불필요.
        level:"",
        skills:"",
        topic:"",
        grade:"" ,
    };

    const [dataTosave, setDataToSave] = useState(dataDefault)
    const router = useRouter()
    const nameRef = useRef()
    const emailRef = useRef()
    // const affiliationRef = useRef()    // prototype은 불필요
    const badgeType = useRef()
    const subject = useRef()
    const description = useRef()
    const gender = useRef()
    const category = useRef()
    const badgeName = useRef()

    // input onChange function
    const handleInputChange = (fieldName, newValue) => {
        setDataToSave((prevData)=>({
            ...prevData,
            [fieldName]:newValue,
        }))
    }

    // file(image) input onChange function
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file)
        console.log(file)

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // 배지 이미지 업로드
    // 입력 정보를 기반으로 배지 생성
    // api : CreateABadge
    async function uploadNow() {

        try {
            setIsLoading(true)
            const storageRef = ref(storage, Date.now() + '.png');
            // Create a reference to 'images/mountains.jpg'
            uploadBytes(storageRef, image).then(async (snapshot) => {

                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    setSelectedFile(downloadURL);

                    dataTosave.walletAddress=account?.address || "";
                    // dataTosave.walletSignature=""
                    dataTosave.image = downloadURL
                    dataTosave.description = description?.current.value
                    dataTosave.birthdate = startDate

                    // send data to server to issue badge
                    try {
                        console.log(dataTosave)

                        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/CreateABadge`, dataTosave)
                        setIsLoading(false)
                        // fileInput value init
                        document.getElementById('fileInput').value = ''
                        
                        // set dialog content and opne dialog
                        setContent({
                            title: "Success",
                            description: "Badge created successfully",
                            badgeID : res.data?.badgeID,
                            status : true,
                        })
                        setOpen(true)

                    } catch (error) {
                        console.log(error)
                        setIsLoading(false)

                        // set dialog content and opne dialog
                        setContent({
                            variant: "destructive",
                            title: "Failed",
                            description: "Badge generation failed ",
                            status: false

                        })
                        setOpen(true)
                    }
                });
            });
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            // set dialog content and opne dialog
            setContent({
                variant: "destructive",
                title: "Error",
                description: "There was an error to upload the image file",
                status: false

            })
            setOpen(true)
        }

    }

    if (currentUser) {
        // 배지 생성을 위한 Form 렌더링
        return (
            <div className="content-center px-4">
                <div className=''>
                    { (section === 1) ? 
                        (   
                            // 섹션 1 렌더링 
                            <>
                                <div className='mb-5 text-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-7 h-7 mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                    <p className='text-md text-gray-500'>생성된 배지는 관리자에 의해 승인된 후</p>
                                    <p className='text-md text-gray-500'>수취인에게 발급됩니다</p>
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    {/* 배지 수취인 정보 */}
                                    <p className='underline underline-offset-2 font-bold text-lg text-gray-600 mb-2'>배지 수취인</p>
                                    <Input 
                                        inputRef={nameRef} 
                                        type='text' 
                                        placeholder={dataTosave.name} 
                                        value={dataTosave.name} 
                                        onChange={(newValue) => handleInputChange("name", newValue)}
                                    />
                                    <Input 
                                        inputRef={emailRef} 
                                        type='email' 
                                        placeholder={dataTosave.email} 
                                        value={dataTosave.email} 
                                        onChange={(newValue) => handleInputChange("email", newValue)}
                                    />
                                    <Select 
                                        selectRef={gender}
                                        defaultValue="성별"
                                        onChange={(newValue)=>handleInputChange("gender", newValue)} 
                                        options={genderOptions}
                                    >
                                    </Select>
                                    <p className='mt-4 '>생년월일</p>
                                    <DatePicker
                                        required
                                        selected={startDate}
                                        onChange={(date) => {setStartDate(date)}}
                                        className='appearance-none p-2 w-full border rounded-xl mt-1 ring-0 focus-visible:bg-none focus:outline-none'
                                    />
                                    {/* 
                                    <Input
                                        required 
                                        inputRef={affiliationRef}
                                        type='text' 
                                        placeholder='소속' 
                                        value={dataTosave.affiliation} 
                                        onChange={(newValue) => handleInputChange("affiliation", newValue)}
                                    /> 
                                    */}
                                </div>
                            </>

                        ) :
                        (
                            // 섹션 2 렌더링
                            <div className='h-[31rem] overflow-auto scrollbar-hide'>
                                {/* 배지 이미지 렌더링 */}
                                <div
                                    onClick={() => document.getElementById('fileInput').click()}
                                    className='border flex items-center justify-center hover:bg-gray-100 cursor-pointer border-dashed rounded-xl border-gray-400'
                                >
                                    {!selectedImage && <div className='items-center flex-col py-3'>
                                        <ArrowUpTrayIcon className='text-gray-600 font-extrabold w-7 h-7 mx-auto' />
                                        <div className='font-bold mt-1 text-center'>
                                            <p className='text-gray-60 text-center0'>배지 이미지 업로드</p>
                                            <p className='text-gray-400'>JPG, PNG, GIF</p>
                                        </div>
                                    </div>}
                                    <input
                                        required
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    {selectedImage && (
                                        <Image width={100} height={100} src={selectedImage} alt="Uploaded" className='object-cover rounded-lg' />
                                    )}

                                </div>
                                <div className='flex flex-col'>
                                    {/* 데이터 배지 정보 Input */}
                                    <p className='mt-5 mb-1 underline underline-offset-2 font-bold text-lg text-gray-600'>
                                        데이터 배지 정보
                                    </p>
                                    {/* 배지 이름 */}
                                    <Input 
                                        required
                                        inputRef={badgeName} 
                                        type='text' 
                                        placeholder='배지 이름' 
                                        value={dataTosave.badgeName} 
                                        onChange={(newValue)=>handleInputChange("badgeName", newValue)}
                                    />
                                    {/* 배지 카테고리 */}
                                    <Select 
                                        selectRef={category} 
                                        defaultValue='배지 카테고리'
                                        options={categoryOptions}
                                        onChange={(newValue)=>handleInputChange("category", newValue)} 
                                    />
                                    {/* 배지 유형 */}
                                    <Select 
                                        selectRef={badgeType} 
                                        defaultValue="배지 유형"
                                        options={badgeTypeOptions}
                                        onChange={(newValue)=>handleInputChange("badgetype", newValue)}
                                    >
                                    </Select>
                                    {/* 배지 정보 제목 */}
                                    <Input 
                                        inputRef={subject} 
                                        type='text' 
                                        placeholder='배지 정보 제목 ex) 대외활동'
                                        value={dataTosave.subject}
                                        onChange={(newValue)=>handleInputChange("subject", newValue)}
                                    />
                                    {/* 배지 description */}
                                    <textarea
                                        ref={description}
                                        className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none' 
                                        placeholder='배지 설명 ex) 한국 아이디어 공모전 우수상 '
                                    >
                                    </textarea>
                                </div>
                            </div>
                        )}
                    </div>
                    { (section === 1) ? (
                        <>
                            {/* section 1 = next button */}
                            <div className='flex items-center justify-end mt-4'>
                                <button
                                    onClick={()=> setSection(section+1)}
                                    className='bg-black flex items-center justify-center space-x-2 px-4 py-3 text-white rounded-xl cursor-pointer'
                                >
                                    <p className='font-semibold'>다음</p>
                                </button>
                            </div>
                        </>
                    ): (
                        <>
                            {/* section 2 - prev and upload button */}
                            <div className='flex items-center justify-between mt-4'>
                                <button
                                    onClick={() => setSection(section-1)}
                                    className='bg-gray-400 flex  items-center justify-center space-x-2 p-4 text-white rounded-xl cursor-pointer'
                                >
                                    <p className='font-semibold'>이전</p>
                                </button>
                                <button
                                    disabled={
                                        isLoading || 
                                        dataTosave.badgeName === "" ||
                                        dataTosave.subject === "" ||
                                        dataTosave.badgetype === "" ||
                                        dataTosave.gender === "" ||
                                        !selectedImage
                                    }
                                    onClick={() => uploadNow()}
                                    className='bg-blue-900 flex items-center justify-center space-x-2 p-4 text-white rounded-xl cursor-pointer disabled:opacity-50'
                                >
                                    {isLoading && <ArrowPathIcon className='w-4 h-4 stroke-white animate-spin' />}
                                    <p className='font-semibold'>만들기</p>
                                </button>
                            </div>
                        </>
                    )
                }

                {/* 배지 생성 결과 dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader className="items-center">
                            <div className='mb-3'>
                                {content?.status ? (
                                        <CheckIcon className='w-8 h-8 stroke-2 stroke-green-600 rounded-full border-2 border-green-600'></CheckIcon>
                                    ) : (
                                        <ExclamationTriangleIcon className='w-8 h-8 stroke-2 stroke-red-600'></ExclamationTriangleIcon>
                                    )
                                }
                            </div>
                            <DialogTitle>{content?.title}</DialogTitle>
                            <DialogDescription>{content?.description}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex-row space-x-2 border-none">
                        <Button type="button" variant="secondary" className="flex-1"  onClick={()=>{router.push('/home')}}>Home</Button>
                                {content?.status ? (
                                    <Button type="button" className="flex-1" onClick={()=>{router.push(`/badge/certificate/${content?.badgeID}/detail`)}}>Show detail</Button>
                                ) : (
                                    <DialogClose asChild>
                                        <Button type="button" className="flex-1" variant="destructive" onClick={()=>{setSection(section-1)}}>
                                            Rewrite
                                        </Button>
                                    </DialogClose>
                                )}                            
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
    else {
        router.push('/')
    }

}