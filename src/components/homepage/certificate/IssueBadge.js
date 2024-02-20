"use client"
import { useState, useRef } from 'react';
import { useAuth } from '@/context/Context';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/service/firebase'
import axios from 'axios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button"
import {
  Dialog,
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
import { Input, Select } from '@/components/ui/input';


export default function IssueBadge() {
    const { currentUser } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedfile, setSelectedFile] = useState(null)
    const [image, setImage] = useState(null)
    const [section, setSection] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState({})

    const dataForm = { 
        userId:"", 
        walletAddress:"", // wagmi + rainbowkit
        walletSignature:"", // wagmi + rainbowkit
        name: "",
        description: "",
        email:"",
        affiliation:"",
        birthdate:"",
        gender:"",
        badgetype: "",
        subject: [], // ["1","2","3",..."n"]
        skills: "",
        grade: "",
        level: "",
        image: "",
        badgeName: "",
        topic:"",
        category:"", // Standard , NFT, etc ...
    }

    const [dataTosave, setDataToSave] = useState(dataForm)
    const router = useRouter()
    const nameRef = useRef()
    const emailRef = useRef()
    const affiliationRef = useRef()
    const badgeType = useRef()
    const subject = useRef()
    const description = useRef()
    const skills = useRef()
    const grade = useRef()
    const level = useRef()
    const gender = useRef()
    const topic = useRef()
    const category = useRef()
    const badgeName = useRef()

    const handleInputChange = (fieldName, newValue) => {
        setDataToSave((prevData)=>({
            ...prevData,
            [fieldName]:newValue,
        }))
    }

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

    async function uploadNow() {

        try {
            setIsLoading(true)
            const storageRef = ref(storage, Date.now() + '.png');
            // Create a reference to 'images/mountains.jpg'
            uploadBytes(storageRef, image).then(async (snapshot) => {

                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    setSelectedFile(downloadURL)
                    
                    dataTosave.userId = currentUser.uid
                    dataTosave.walletAddress=""
                    dataTosave.walletSignature=""
                    dataTosave.image = downloadURL
                    dataTosave.description = description.current.value
                    dataTosave.birthdate = startDate

                    // send to backend for storing
                    try {
                        console.log(dataTosave)

                        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/CreateABadge`, dataTosave)
                        setIsLoading(false)
                        document.getElementById('fileInput').value = ''
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
                        setContent({
                            variant: "destructive",
                            title: "Failed",
                            description: "Badge generation failed " + error,
                            status: false

                        })
                        setOpen(true)
                    }
                });
            });
        } catch (error) {
            console.log(error)
            alert('error uploading the file', error)
            setContent({
                variant: "destructive",
                title: "Error",
                description: "There was an error " + error,
                status: false

            })
            setIsLoading(false)
            setOpen(true)
        }

    }


    if (currentUser) {
        return (
            <div className="content-center px-4">
                <div className=''>
                    { (section === 1) ? 
                        (   
                            <>
                                <div className='mb-5'>
                                    <p className='text-xl font-semibold'>Create a badge</p>
                                    <p className='mt-2 text-md text-gray-600'>Once created, the badge will be verified and approved by the admin prior being issued to the receipient</p>
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    <p className='underline underline-offset-2 font-bold text-lg text-gray-600 mb-2'>Issueing to</p>
                                    <Input 
                                        inputRef={nameRef} 
                                        type='text' 
                                        placeholder='Receipient Name' 
                                        value={dataTosave.name} 
                                        onChange={(newValue) => handleInputChange("name", newValue)}
                                    />
                                    <Input 
                                        inputRef={emailRef} 
                                        type='email' 
                                        placeholder='Receipient Email' 
                                        value={dataTosave.email} 
                                        onChange={(newValue) => handleInputChange("email", newValue)}
                                    />
                                    <Input 
                                        inputRef={affiliationRef}
                                        type='text' 
                                        placeholder='Affiliation' 
                                        value={dataTosave.affiliation} 
                                        onChange={(newValue) => handleInputChange("affiliation", newValue)}
                                    />
                                    <Select 
                                        selectRef={gender}
                                        defaultValue="Select gender"
                                        onChange={(newValue)=>handleInputChange("gender", newValue)} 
                                        options={["M", "F", "X"]}
                                    >
                                    </Select>
                                    
                                    <p className='mt-4 '>Receipient Date of birth</p>
                                    <DatePicker
                                        required
                                        selected={startDate}
                                        onChange={(date) => {setStartDate(date)}}
                                        className='appearance-none p-2 w-full border rounded-xl mt-1 ring-0 focus-visible:bg-none focus:outline-none'
                                    />
                                </div>
                            </>

                        ) :
                        (
                            <div className='h-[31rem] overflow-auto scrollbar-hide'>
                                <div
                                    onClick={() => document.getElementById('fileInput').click()}
                                    className='border flex items-center justify-center hover:bg-gray-100 cursor-pointer border-dashed rounded-xl border-gray-400'
                                >
                                    {!selectedImage && <div className='flex items-center flex-col'>
                                        <div>
                                            <ArrowUpTrayIcon className='text-gray-600 font-extrabold' />
                                        </div>
                                        <p className='font-bold text-gray-600 mt-4'>Click to Upload badge image</p>
                                        <p className='font-bold text-gray-400 mt-1'>JPG, PNG, GIF</p>
                                    </div>}

                                    <input
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
                                    
                                    <p className='mt-5 mb-1 underline underline-offset-2 font-bold text-lg text-gray-600'>
                                        Data Badge Claims
                                    </p>
                                    <Input 
                                        inputRef={badgeName} 
                                        type='text' 
                                        placeholder='Badge Name' 
                                        value={dataTosave.badgeName} 
                                        onChange={(newValue)=>handleInputChange("badgeName", newValue)}
                                    />
                                    <Input 
                                        inputRef={badgeType} 
                                        type='text'  
                                        placeholder='Badge Type'
                                        value={dataTosave.badgetype}
                                        onChange={(newValue)=>handleInputChange("badgetype", newValue)} 
                                    />
                                    <Input 
                                        inputRef={subject} 
                                        type='text' 
                                        placeholder='Subject'
                                        value={dataTosave.subject}
                                        onChange={(newValue)=>handleInputChange("subject", newValue.split(',').map(item=>item.trim()))}
                                    />
                                    <Input 
                                        inputRef={topic} 
                                        type='text' 
                                        placeholder='Topic'
                                        value={dataTosave.topic}
                                        onChange={(newValue)=>handleInputChange("topic", newValue)}
                                    />
                                    <Select 
                                        selectRef={category} 
                                        defaultValue="Select category"
                                        options={["Standard", "NFT"]}
                                        onChange={(newValue)=>handleInputChange("category", newValue)}
                                    >
                                    </Select>

                                    <textarea
                                        ref={description}
                                        className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none' 
                                        placeholder='Badge Description'
                                    >
                                    </textarea>
                                    
                                    <Input 
                                        inputRef={skills} 
                                        type='text'
                                        placeholder='Skills' 
                                        value={dataTosave.skills}
                                        onChange={(newValue)=>handleInputChange("skills", newValue)}
                                    />

                                    <Select 
                                        selectRef={grade} 
                                        defaultValue="Select grade"
                                        options={["A+", "A", "B+", "B"]}
                                        onChange={(newValue)=>handleInputChange("grade", newValue)}
                                        >
                                    </Select>

                                    <Select 
                                        selectRef={level} 
                                        defaultValue="Select level"
                                        options={["Beginner", "Intermediate", "Advanced"]}
                                        onChange={(newValue)=>handleInputChange("level", newValue)} 
                                        >
                                    </Select>

                                    
                                </div>
                            </div>
                        )}
                    </div>
                    { (section === 1) ? (
                        <>
                            <div className='flex items-center justify-end mt-4'>
                                <button
                                    //disabled={}
                                    onClick={()=> setSection(section+1)}
                                    className='bg-black flex items-center justify-center space-x-2 px-4 py-3 text-white rounded-xl cursor-pointer'
                                >
                                    <p className='font-semibold'>Next</p>
                                </button>
                            </div>
                        </>
                    ): (
                        <>
                            <div className='flex items-center justify-between mt-4'>
                                <button
                                    onClick={() => setSection(section-1)}
                                    className='bg-gray-400 flex  items-center justify-center space-x-2 p-4 text-white rounded-xl cursor-pointer'
                                >
                                    <p className='font-semibold'>Prev</p>
                                </button>
                                <button
                                    disabled={isLoading ? true : false}
                                    onClick={() => uploadNow()}
                                    className='bg-black flex  items-center justify-center space-x-2 p-4 text-white rounded-xl cursor-pointer'
                                >
                                    {isLoading && <ArrowPathIcon className='stroke-white animate-spin' />}
                                    <p className='font-semibold'>Generate</p>
                                </button>
                            </div>
                        </>
                    )
                }

                
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
                            <Button type="button" variant="secondary" className="flex-1">
                                <Link href="/home">
                                    Home
                                </Link>
                            </Button>
                            {content?.status ? (
                                <Button type="button" className="flex-1">
                                    <Link href={`/badge/certificate/${content?.badgeID}/detail`}>
                                        Show detail
                                    </Link>
                                </Button>
                            ) : (
                                <Button type="button" className="flex-1" variant="destructive">
                                    <Link href={`/badge/certificate/issue`}>
                                        Rewrite
                                    </Link>
                                </Button>
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