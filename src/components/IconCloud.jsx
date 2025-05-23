"use client";

import  { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({ icons, images }) {
  const canvasRef = useRef(null);
  const [iconPositions, setIconPositions] = useState([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState(null);
  const animationFrameRef = useRef();
  const rotationRef = useRef(rotation);
  const iconCanvasesRef = useRef([]);
  const imagesLoadedRef = useRef([]);

  // Create icon canvases once when icons/images change
  useEffect(() => {
    if (!icons && !images) return;
    const items = icons ||  images || [];
    imagesLoadedRef.current = new Array(items.length).fill(false);
    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 40;
      offscreen.height = 40;
      const offCtx = offscreen.getContext("2d");
      if (offCtx) {
        if (images) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = items[index];
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            offCtx.beginPath();
            offCtx.arc(20, 20, 20, 0, Math.PI * 2);
            offCtx.closePath();
            offCtx.clip();
            offCtx.drawImage(img, 0, 0, 40, 40);
            imagesLoadedRef.current[index] = true;
          };
        } else {
          offCtx.scale(0.4, 0.4);
          const svgString = renderToString(item);
          const img = new Image();
          img.src = "data:image/svg+xml;base64," + btoa(svgString);
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            offCtx.drawImage(img, 0, 0);
            imagesLoadedRef.current[index] = true;
          };
        }
      }
      return offscreen;
    });
    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images]);

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const items = icons || images || [];
    const newIcons = [];
    const numIcons = items.length || 20;
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      newIcons.push({
        x: x * 100,
        y: y * 100,
        z: z * 100,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [icons, images]);

  // Handle mouse events
  const handleMouseDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);
      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;
      const screenX = canvasRef.current.width / 2 + rotatedX;
      const screenY = canvasRef.current.height / 2 + rotatedY;const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;
      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z));
        const targetY = Math.atan2(icon.x, icon.z);
        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );
        const duration = Math.min(2000, Math.max(800, distance * 1000));
        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return;
      }
    });
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
    
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

// Animation and drawing
  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      iconPositions.forEach((icon, index) => {
        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX - rotatedZ * sinX;

        const scale = (rotatedZ + 200) / 300;
        const opacity = Math.max(0.1, scale);

        const screenX = width / 2 + rotatedX;
        const screenY = height / 2 + rotatedY;

        ctx.globalAlpha = opacity;

        const iconCanvas = iconCanvasesRef.current[index];
        if (iconCanvas && imagesLoadedRef.current[index]) {
          const size = 40 * scale;
          ctx.drawImage(
            iconCanvas,
            screenX - size / 2,
            screenY - size / 2,
            size,
            size
          );
        }
      });

      ctx.globalAlpha = 1;
    };

   const animate = (time) => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  // سرعة التدوير حسب موضع الماوس
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const dx = mousePos.x - centerX;
  const dy = mousePos.y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
  const speed = 0.003 + (distance / maxDistance) * 0.01;

  // تدوير تلقائي إذا ما في سحب
  if (!isDragging && !targetRotation) {
    rotationRef.current = {
      x: rotationRef.current.x + (dy / canvas.height) * speed,
      y: rotationRef.current.y + (dx / canvas.width) * speed
    };
  }

  // إذا في دوران مستهدف (click animation)
  if (targetRotation) {
    const elapsed = time - targetRotation.startTime;
    const t = Math.min(1, elapsed / targetRotation.duration);
    const eased = easeOutCubic(t);
    rotationRef.current = {
      x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * eased,
      y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * eased,
    };
    if (t >= 1) {
      setTargetRotation(null);
    }
  }

  draw();
  animationFrameRef.current = requestAnimationFrame(animate);
};
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [icons,images, iconPositions,isDragging,mousePos, targetRotation]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "60%", height: "100%", display: "block" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );


}