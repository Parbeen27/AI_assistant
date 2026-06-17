import React, { useContext, useRef, useState } from 'react'
import Card from "../components/Card"
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import { RiImageAddLine } from 'react-icons/ri'
import { userData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
export default function Customize() {
    const {file,setFile,savefile,setSaveFile,selectedImage,setSelectedImage} = useContext(userData)
    const inputImage = useRef()
    const navigate = useNavigate()
    const handleImage = (e) => {
        const file = e.target.files[0]
        setSaveFile(file)
        setFile(URL.createObjectURL(file))
    }
    return (
        <div className='w-full h-screen bg-linear-to-t from-black to-blue-950 flex justify-center items-center flex-col'>
            <h1 className='text-white text-2xl mb-12'>Select your Assistant Image<hr/></h1>
            <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-3'>
                <div onClick={() => {
                    setSelectedImage(image1)
                    
                    navigate("/")
                }}>
                    <Card image={image1} />
                </div>
                <div onClick={() => {
                    setSelectedImage(image2)
                    
                    navigate("/")
                }}>
                    <Card image={image2} />
                </div>
                <div>
                    <div className={`w-25 h-45 bg-[#020234] border-2 border-[#0000ff2e] rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer hover:border-white
                    ${selectedImage=="input" ? "border-4 border-white shadow-2xl shadow-blue-600":null}`} onClick={() => {inputImage.current.click()
                        setSelectedImage("input")
                    }}>
                        {!file && 
                        <RiImageAddLine className='text-white w-10 h-10'/>  }
                        {file &&
                        <img src={file} className='h-full object-cover'/>}
                    </div>
                    <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
                </div>
            </div>
        </div>
    )
}
