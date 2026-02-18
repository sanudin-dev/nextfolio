import Image from "next/image";
import { BackgroundRippleEffect } from "@/ui/background-ripple-effect";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex w-full items-center flex-col py-8 lg:py-16"
    >
      <div className="absolute inset-x-0 top-0 h-[min(420px,70vh)] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]">
          <BackgroundRippleEffect
            rows={6}
            cols={20}
            cellSize={44}
          />
        </div>
      </div>
      <div className="relative z-10 flex w-full items-center flex-col px-6">
        <Image
          alt="Sanudin Avatar"
          width={200}
          height={200}
          src="/sanudin-avatar.png"
        />
        <div className="text-center mx-auto mb-15">
          <h1 className="text-4xl lg:text-6xl my-5 font-bold text-title">
            Hi, I&apos;m
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600 mx-3">
              Sanudin
            </span>
            👋
          </h1>
          <h2 className="text-xl lg:text-2xl font-semibold text-content">
            A software engineer, developer, and lifelong learner
          </h2>
        </div>
        {/* Gif maker https://ezgif.com */}
        {/* Icons from https://www.flaticon.com */}
        <Image alt="Icons" width={48} height={48} src="/icons.webp" />
      </div>
      <div className="w-[1px] h-[10rem] mt-10 relative overflow-hidden after:absolute after:block after:bg-primary after:w-full after:h-[50%] after:transition-all after:animate-moveme"></div>
    </section>
  );
}
