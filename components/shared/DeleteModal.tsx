'use client'
import useClickOutsideModal from "@/hooks/useClickOutsideModal";
import useLoading from "@/hooks/useLoading";
import { deletePost } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
const DeleteModal = ({onClose,show,id}:{show:boolean,onClose: ()=>void,id:string}) => {
    const {isLoading,setIsLoading} =  useLoading();
    const {popupRef} = useClickOutsideModal({onClose,show,isLoading});
    const path = usePathname();
    const handleDelete = async () =>{
        setIsLoading(true)
        await deletePost(id,path);
        setIsLoading(false)
        onClose();
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-25 bg-slate-600">
        <div ref={popupRef} className="w-11/12 sm:w-6/12 md:w-5/12 xl:w-4/12 bg-dark-4d bg-black shadow-xl shadow-primary-500 h-fit z-50 rounded-2xl flex flex-col px-8 py-5 fixed top-1/4 left-2/4 -translate-x-2/4 ">
        <h3 className="text-heading3-bold text-white">Delete Post?</h3>
        <p className="opacity-50 text-white py-1">
            This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from search results.
        </p>
        <button
            type="button"
            className="bg-red-500 text-white font-bold rounded-full py-2 my-2"
            onClick={handleDelete}
            disabled={isLoading}
        >
            Delete
        </button>
        <button
            type="button"
            className="font-bold text-white bg-dark-4 border rounded-full py-2 mb-2"
            onClick={onClose}
            disabled={isLoading}
        >
            Cancel
        </button>
        </div>
    </div>
  );
};

export default DeleteModal;
