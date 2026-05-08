"use client";

import { useEffect } from "react";

type ShapeKind = 0 | 1 | 2;

type Shape = {
  x: number;
  y: number;
  size: number;
  type: ShapeKind;
  rotation: number;
  rotSpeed: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
};

function createShape(width: number, height: number): Shape {
  const colors = ["78,205,196", "58,155,213", "224,120,80"];

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 100 + 25,
    type: Math.floor(Math.random() * 3) as ShapeKind,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.003,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.08 + 0.03,
    color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0],
  };
}

function updateShape(shape: Shape, width: number, height: number, mouseX: number, mouseY: number) {
  shape.x += shape.vx;
  shape.y += shape.vy;
  shape.rotation += shape.rotSpeed;

  const dx = shape.x - mouseX;
  const dy = shape.y - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0 && distance < 200) {
    const force = ((200 - distance) / 200) * 0.5;
    shape.x += (dx / distance) * force;
    shape.y += (dy / distance) * force;
  }

  if (shape.x < -100) {
    shape.x = width + 100;
  }

  if (shape.x > width + 100) {
    shape.x = -100;
  }

  if (shape.y < -100) {
    shape.y = height + 100;
  }

  if (shape.y > height + 100) {
    shape.y = -100;
  }
}

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
  ctx.save();
  ctx.translate(shape.x, shape.y);
  ctx.rotate(shape.rotation);
  ctx.strokeStyle = `rgba(${shape.color},${shape.opacity})`;
  ctx.lineWidth = 1.5;

  if (shape.type === 0) {
    ctx.beginPath();
    ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
    ctx.stroke();
  } else if (shape.type === 1) {
    ctx.beginPath();
    for (let i = 0; i < 3; i += 1) {
      const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
      ctx.lineTo(Math.cos(angle) * (shape.size / 2), Math.sin(angle) * (shape.size / 2));
    }
    ctx.closePath();
    ctx.stroke();
  } else {
    const size = shape.size / 2;
    ctx.strokeRect(-size, -size, shape.size, shape.size);
  }

  ctx.restore();
}

export function HomeInteractions() {
  useEffect(() => {
    const canvas = document.getElementById("shapes-canvas");
    const glowEl = document.getElementById("cursorGlow");

    if (!(canvas instanceof HTMLCanvasElement) || !(glowEl instanceof HTMLElement)) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return undefined;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = -1000;
    let mouseY = -1000;
    let animationFrameId = 0;
    const shapes = Array.from({ length: 30 }, () => createShape(width, height));
    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".process-step, .deliverable-card, .fit-card, .faq-item, .case-card, .price-card, .about-stat",
      ),
    );

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const animateShapes = () => {
      ctx.clearRect(0, 0, width, height);
      for (const shape of shapes) {
        updateShape(shape, width, height, mouseX, mouseY);
        drawShape(ctx, shape);
      }
      animationFrameId = window.requestAnimationFrame(animateShapes);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      glowEl.style.left = `${event.clientX}px`;
      glowEl.style.top = `${event.clientY}px`;
    };

    const tiltCleanups = tiltCards.map((card) => {
      const handleCardMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`;
        card.style.boxShadow = `${-(x * 20)}px ${y * 20}px 40px rgba(0,0,0,.2)`;
      };

      const handleCardLeave = () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      };

      card.addEventListener("mousemove", handleCardMove);
      card.addEventListener("mouseleave", handleCardLeave);

      return () => {
        card.removeEventListener("mousemove", handleCardMove);
        card.removeEventListener("mouseleave", handleCardLeave);
      };
    });

    for (const element of revealEls) {
      element.style.opacity = "0";
      element.style.transform = "translateY(24px)";
      element.style.transition = "all .6s cubic-bezier(.16,1,.3,1)";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        }
      },
      { threshold: 0.1 },
    );

    for (const element of revealEls) {
      observer.observe(element);
    }

    resizeCanvas();
    animateShapes();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      for (const cleanup of tiltCleanups) {
        cleanup();
      }
    };
  }, []);

  return null;
}
