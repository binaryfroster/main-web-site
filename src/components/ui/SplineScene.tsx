"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
    </div>
  ),
});

interface SplineSceneProps {
  sceneUrl?: string;
  className?: string;
}

export default function SplineScene({ 
  sceneUrl = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode",
  className = "" 
}: SplineSceneProps) {
  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}>
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      }>
        <Spline scene={sceneUrl} />
      </Suspense>
    </div>
  );
}
