"use client"
import { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { redirect, useRouter } from 'next/navigation'
import Image from 'next/image'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/service/firebase'
import { ArrowUpTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { stringify } from 'postcss';
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
        userId:currentUser.uid, 
        walletAddress:"", // wagmi + rainbowkit
        walletSignature:"", // wagmi + rainbowkit
        name: "",
        description: "",
        email:"",
        affiliation:"",
        birthdate:"",
        gender:"",
        badgetype: "",
        subject: "", // ["1","2","3",..."n"]
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

                    const dataTosave = { 
                        userId:currentUser.uid, 
                        walletAddress:"", // wagmi + rainbowkit
                        walletSignature:"", // wagmi + rainbowkit
 
                    }
        

                    // send to backend for storing
                    try {
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/CreateABadge`, dataTosave)
                        setIsLoading(false)
                        document.getElementById('fileInput').value = ''
                        alert(stringify({
                            title: "Success",
                            description: "Badge created successfully",

                        }))
                    } catch (error) {
                        console.log(error)
                        setIsLoading(false)
                        alert(stringify({
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
            alert(stringify({
                variant: "destructive",
                title: "Error",
                description: "There was an error " + error,

            }))
            setIsLoading(false)
        }

    }


    if (currentUser) {
        console.log(section)
        return (
            <div className="rounded-md content-center px-4">
                { (section === 1) ? 
                    (   
                    <div className='flex flex-col space-y-3'>
                        <div className='mb-5'>
                            <p className='text-xl font-semibold'>Create a badge</p>
                            <p className='mt-2 text-md text-gray-600'>Once created, the badge will be verified and approved by the admin prior being issued to the receipient</p>
                        </div>
                        <p className='underline underline-offset-2 font-bold text-lg text-gray-600 mb-2'>Issueing to</p>
                        <Input inputRef={nameRef} type='text' placeholder='Receipient Name' value={dataTosave.name} onChange={(newValue) => handleInputChange("name", newValue)}/>
                        <Input inputRef={emailRef} type='email' placeholder='Receipient Email' value={dataTosave.email} onChange={(newValue) => handleInputChange("email", newValue)} />
                        <input ref={affiliationRef} type='text' className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none' placeholder='Affiliation' />
                        <select ref={gender} defaultValue="Select gender" className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none'>
                            <option disabled className=''>Select gender</option>
                            <option value="M" >M</option>
                            <option value="F" >F</option>
                            <option value="X" >X</option>
                        </select>
                        <p className='mt-4 '>Receipient Date of birth</p>
                        <DatePicker
                            required
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className='appearance-none p-2 w-full border rounded-xl mt-1 ring-0 focus-visible:bg-none focus:outline-none'
                        />
                        <div className='flex items-center justify-end mt-4'>
                            <button
                                //disabled={}
                                onClick={() => {setSection(section+1); console.log(dataTosave)}}
                                className='bg-black flex  items-center justify-center space-x-2 px-4 py-3 text-white rounded-xl cursor-pointer'
                            >
                                <p className='font-semibold'>Next</p>
                            </button>
                        </div>

                     </div>   

                    ) :
                    (
                        <div className='flex flex-col space-y-3'>
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
                            <div className='flex flex-col md:w-3/4'>
                                
                                <p className='mt-5 mb-1 underline underline-offset-2 font-bold text-lg text-gray-600'>
                                    Data Badge Claims
                                </p>
                                <input ref={badgeName} type='text' className='appearance-none border rounded-xl p-2  ring-0 focus-visible:bg-none focus:outline-none' placeholder='Badge Name' />
                                <input ref={badgeType} type='text' className='appearance-none border rounded-xl p-2 mt-4 ring-0 focus-visible:bg-none focus:outline-none' placeholder='Badge Type' />
                                <input ref={subject} type='text' className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none' placeholder='Subject' />
                                <input ref={topic} type='text' className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none' placeholder='Topic' />

                                <select ref={category} defaultValue="Select category" placeholder="Category" className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none'>
                                    <option disabled className=''>Select category</option>
                                    <option value="Standard" >Standard</option>
                                    <option value="NFT" >NFT</option>
                                </select>

                                <textarea
                                    ref={description}
                                    className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none' placeholder='Badge Description'
                                >

                                </textarea>
                                <div className='flex mt-3 border rounded-lg items-center '>
                                    <input ref={skills} type='text' className='appearance-none rounded-xl p-2 flex-1 ring-0 focus-visible:bg-none focus:outline-none' placeholder='Skills' />
                                </div>

                                <select ref={grade} defaultValue="Select grade" placeholder="Grade" className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none'>
                                    <option disabled className=''>Select grade</option>
                                    <option value="A+" >A+</option>
                                    <option value="A" >A</option>
                                    <option value="B+" >B+</option>
                                    <option value="B" >B</option>
                                    <option value="C+" >C+</option>
                                    <option value="C" >C</option>

                                </select>

                                <select ref={level} defaultValue="Select level" className='appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none'>
                                    <option disabled className=''>Select level</option>
                                    <option value="Beginner" >Beginner</option>
                                    <option value="Intermediate" >Intermediate</option>
                                    <option value="Advanced" >Advanced</option>
                                </select>

                                <div
                                    className='flex items-center justify-between mt-4'
                                >
                                    <button
                                        //disabled={}
                                        onClick={() => {setSection(section-1);console.log(dataTosave)}}
                                        className='bg-black flex  items-center justify-center space-x-2 p-4 text-white rounded-xl cursor-pointer'
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
                        </div>
                    )

                }

                {/* > */}
            </div>
        )
    }
    else {
        router.push('/')
    }

}