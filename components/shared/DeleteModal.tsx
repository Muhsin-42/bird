"use client";
import useClickOutsideModal from "@/hooks/useClickOutsideModal";
import useLoading from "@/hooks/useLoading";
import { deletePost } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";
import React from "react";
const DeleteModal = ({
  onClose,
  show,
  id,
}: {
  show: boolean;
  onClose: () => void;
  id: string;
}) => {
  const { isLoading, setIsLoading } = useLoading();
  const { popupRef } = useClickOutsideModal({ onClose, show, isLoading });
  const path = usePathname();
  const handleDelete = async () => {
    setIsLoading(true);
    await deletePost(id, path);
    setIsLoading(false);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-600/25">
      <div
        ref={popupRef}
        className="fixed left-2/4 top-1/4 z-50 flex h-fit w-11/12 -translate-x-2/4 flex-col rounded-2xl bg-black px-8 py-5 shadow-xl shadow-primary-500 sm:w-6/12 md:w-5/12 xl:w-4/12 "
      >
        <h3 className="text-heading3-bold text-white">Delete Post?</h3>
        <p className="py-1 text-white opacity-50">
          {`
          This can’t be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from search results.
        `}
        </p>
        <button
          type="button"
          className="my-2 rounded-full bg-red-500 py-2 font-bold text-white"
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete
        </button>
        <button
          type="button"
          className="mb-2 rounded-full border bg-dark-4 py-2 font-bold text-white"
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
