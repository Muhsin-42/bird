"use client";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import useClickOutsideModal from "@/hooks/useClickOutsideModal";
import useLoading from "@/hooks/useLoading";
import { deletePost } from "@/lib/actions/thread.actions";

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
    toast.success("Post is Deleted", { duration: 1500 });
    setIsLoading(false);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-600/25">
      <div
        className="-translate-x-2/4 fixed top-1/4 left-2/4 z-50 flex h-fit w-11/12 flex-col rounded-2xl bg-black px-8 py-5 shadow-primary-500 shadow-xl sm:w-6/12 md:w-5/12 xl:w-4/12 "
        ref={popupRef}
      >
        <h3 className="text-heading3-bold text-white">Delete Post?</h3>
        <p className="py-1 text-white opacity-50">
          {`
          This can’t be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from search results.
        `}
        </p>
        <button
          className="my-2 flex justify-center gap-3 rounded-full bg-red-500 py-2 font-bold text-white"
          disabled={isLoading}
          onClick={handleDelete}
          type="button"
        >
          {isLoading ? (
            <>
              Deleting <span className="loader-primary" />
            </>
          ) : (
            "Delete"
          )}
        </button>
        <button
          className="mb-2 rounded-full border bg-dark-4 py-2 font-bold text-white"
          disabled={isLoading}
          onClick={onClose}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
