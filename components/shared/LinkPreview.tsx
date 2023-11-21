'use client'
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
interface IPreviewData{
    "url": string,
    "title": string,
    "siteName"?: string,
    "description"?: string,
    "mediaType": string,
    "contentType"?: string,
    "images": string[],
    "videos": any,
    "favicons": string[],
    "domain": string
}

const LinkPreview = ({link}:{link:string}) => {

    const [previewData,setPreviewData] = useState<IPreviewData | null>(null);
    const [dataLoading,setDataLoading] = useState(true);
    
    async function getLinkData (){
        setDataLoading(true);
        const data = await getLinkPreview(link).then((res)=>{
            let domain = new URL(link).hostname;
            domain = domain.replace(/^www\./, '');
            const response: any = {...res,domain };
            setPreviewData(response)
        }).catch((error)=>{
            console.log('error ',error)
        })
        setDataLoading(false);
    }

    useEffect(()=>{
        getLinkData();
    },[]);

    // useEffect(()=>{
    //     // if()
    // },[previewData])

  return (
    <div className="mt-3">
        {
            !dataLoading && previewData && 
            <Link href={previewData?.url||''} className="w-full flex rounded-xl overflow-hidden border-1 text-white">  
                <div className="w-4/12 border-r relative">
                    <Image
                        src={previewData?.images[0]||''}
                        layout="fill"
                        objectFit="cover"
                        alt="Preview Image"
                    />
                </div>
                <div className="flex flex-col w-8/12 px-1 sm:px-3 py-2 justify-center">
                    <span className="text-gray-400">{previewData?.domain}</span>
                    <span className=" sm:text-heading5-bold">{previewData?.title}</span>
                    <span className="text-gray-400 hidden md:block overflow-hidden overflow-ellipsis h-12">{previewData?.description}</span>
                </div>
            </Link>
        }
    </div>
  )
}

export default LinkPreview