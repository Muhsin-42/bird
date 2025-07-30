'use client';
import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();
  return (
    <button
    type="button"
    onClick={() => router.back()}
    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-dark-3 transition-colors"
  >
    <ArrowLeft className="w-5 h-5 text-light-1" />
  </button>
  )
}

export default BackButton