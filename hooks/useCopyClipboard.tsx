
import React, { useReducer, useState } from 'react'

const useCopyClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    function copyToClipboard (text:string) {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(text).then(function() {
                setIsCopied(true);
                setTimeout(()=>{
                    setIsCopied(false);
                },1000)
            }, function(err) {       });
        }
    }

    return {isCopied,copyToClipboard}
}

export default useCopyClipboard