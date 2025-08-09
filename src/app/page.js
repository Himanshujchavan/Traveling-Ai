  import React from "react";

import { GradientBackground } from "@/components/nurui/gradient-background";
import { AnimatedListDemo } from "@/components/nurui/animated-list-demo";



  const Page = () => {
    return (
      

      <div className="bg-background relative flex h-[900px] w-full flex-col items-center justify-center overflow-hidden rounded-xl">
        <p className="z-10 absolute text-center text-7xl font-bold tracking-tighter whitespace-pre-wrap text-black md:text-10xl dark:text-white">
          WELCOME TO TRAVELING-AI
        </p>
        {/* Background */}
        <GradientBackground />


        
      </div>
      
    );
  };

  export default Page;
