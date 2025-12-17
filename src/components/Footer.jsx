"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gdg from "../../public/gdg.svg"

export default function SpaceFooter() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.02
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity >= 1 || star.opacity <= 0) {
          star.speed = -star.speed;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }, []);

  return (
    <footer className="relative bg-black pb-10 text-white  px-6 overflow-hidden">
     
      
      

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2026 GDG LNMIIT. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Designed & Developed by</span>
              <Image 
                src={gdg} 
                alt="GDG Logo" 
                width={24} 
                height={24}
                className="inline-block"
              />
              <span className="text-sm font-semibold text-white font-bold">
                GDG LNMIIT
              </span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}