"use client"
import { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/service/firebase'
import { ArrowUpTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Input, Select } from '@/components/ui/input';
export default function IssueBadge() {
    const { currentUser } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedfile, setSelectedFile] = useState(null)
    const [image, setImage] = useState(null)
    const [section, setSection] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    
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

                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/CreateABadge`, dataTosave)
                        setIsLoading(false)
                        document.getElementById('fileInput').value = ''
                        alert(JSON.stringify({
                            title: "Success",
                            description: "Badge created successfully",

                        }))
                    } catch (error) {
                        console.log(error)
                        setIsLoading(false)
                        alert(JSON.stringify({
                            variant: "destructive",
                            title: "Failed",
                            description: "Badge generation failed " + error,

                        }))
                    }
                });
            });
        } catch (error) {
            console.log(error)
            alert('error uploading the file', error)
            alert(JSON.stringify({
                variant: "destructive",
                title: "Error",
                description: "There was an error " + error,

            }))
            setIsLoading(false)
        }

    }


    if (currentUser) {
        return (
            <div className="rounded-md content-center px-4">
                <div className='flex flex-col space-y-3'>
                { (section === 1) ? 
                    (   
                        <>
                            <div className='mb-5'>
                                <p className='text-xl font-semibold'>Create a badge</p>
                                <p className='mt-2 text-md text-gray-600'>Once created, the badge will be verified and approved by the admin prior being issued to the receipient</p>
                            </div>
                            
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

                    ) :
                    (
                        <>
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
                                    <Image width={100} height={100} src={selectedImage} alt="Uploaded" className='object-cover w-full h-full rounded-lg' />
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

                                <div
                                    className='flex items-center justify-between mt-4'
                                >
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
                                        {isLoading && <ArrowPathIcon className='animate-spin' />}
                                        <p className='font-semibold'>Generate</p>
                                    </button>
                                </div>

                            </div>
                        </>
                    )

                }
                </div>
            </div>
        )
    }
    else {
        router.push('/')
    }

}