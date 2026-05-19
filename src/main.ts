import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Glitch Text Effect ---
  const glitchTexts = document.querySelectorAll('.glitch-text');
  glitchTexts.forEach(el => {
    const originalText = el.getAttribute('data-text') || el.textContent;
    el.innerHTML = `
      <span class="glitch-layer">${originalText}</span>
      <span class="glitch-layer">${originalText}</span>
      <span class="glitch-layer">${originalText}</span>
    `;
  });

  // --- 2. Hero Animations ---
  gsap.from(".nav-logo", { y: -50, opacity: 0, duration: 1, ease: "bounce.out" });
  
  gsap.from(".hero-title span", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1.5,
    ease: "power4.out",
    delay: 0.2
  });

  gsap.from(".hero-tagline", {
    scale: 0,
    rotation: 180,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    delay: 0.8
  });

  gsap.from(".cta-btn", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    delay: 1.2
  });

  // --- 3. Parallax Roast Cards ---
  const roastCards = document.querySelectorAll('.roast-card');
  roastCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
      x: index % 2 === 0 ? -100 : 100,
      opacity: 0,
      rotation: index % 2 === 0 ? -10 : 10,
    });
  });

  // --- 4. border text reveal ---
  gsap.to(".border-text", {
    scrollTrigger: {
      trigger: "#roast-section",
      start: "top 70%",
      end: "bottom 20%",
      scrub: true,
    },
    backgroundPosition: "200% 50%",
    ease: "none"
  });

  // --- 5. Manifesto List Stagger ---
  gsap.from(".manifesto-list li", {
    scrollTrigger: {
      trigger: "#manifesto",
      start: "top 70%",
    },
    x: -50,
    opacity: 0,
    stagger: 0.3,
    duration: 0.8,
    ease: "power3.out"
  });

  // --- 6. Hall of Shame timeline ---
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.5)",
    });
  });

  // --- 7. Dirty Canvas Cockroach Background ---
  initCockroachCanvas();

  // --- 8. Join counter ticker ---
  let count = 64281;
  const countSpan = document.getElementById('roach-count');
  setInterval(() => {
    count += Math.floor(Math.random() * 5);
    if(countSpan) countSpan.innerText = count.toLocaleString('en-IN');
  }, 2000);

  // --- 9. Submit Button Glitch Shake ---
  const submitBtn = document.getElementById('submit-btn');
  submitBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    gsap.to(submitBtn, {
      x: () => Math.random() * 20 - 10,
      y: () => Math.random() * 20 - 10,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        gsap.set(submitBtn, {x: 0, y: 0});
        submitBtn.innerHTML = "SURVIVAL MODE ACTIVATED";
        submitBtn.classList.replace("bg-[#8B0000]", "bg-[#39FF14]");
        submitBtn.classList.replace("text-white", "text-black");
      }
    });

    // spawn some random roaches on screen for fun
    for(let i=0; i<30; i++) {
        spawnUIroach();
    }
  });

});

// A system to spawn small visual cockroaches roaming the UI
function spawnUIroach() {
    const roach = document.createElement('div');
    roach.style.position = 'fixed';
    roach.style.width = '20px';
    roach.style.height = '30px';
    roach.style.zIndex = '9999';
    roach.style.pointerEvents = 'none';
    // generic roach svg shape black
    roach.innerHTML = `<svg width="20" height="30" viewBox="0 0 24 24" fill="black"><path d="M12 2C10.5 2 9 3.5 9 5C9 5.5 9.2 6 9.4 6.4C8 7.3 7 8.9 7 10.8V11H6C5.4 11 5 11.4 5 12C5 12.6 5.4 13 6 13H7V15C7 17.5 8.7 19.5 11 19.9V22H13V19.9C15.3 19.5 17 17.5 17 15V13H18C18.6 13 19 12.6 19 12C19 11.4 18.6 11 18 11H17V10.8C17 8.9 16 7.3 14.6 6.4C14.8 6 15 5.5 15 5C15 3.5 13.5 2 12 2ZM12 4C12.6 4 13 4.4 13 5C13 5.6 12.6 6 12 6C11.4 6 11 5.6 11 5C11 4.4 11.4 4 12 4ZM10 9H14C14.6 9 15 9.4 15 10V15C15 16.7 13.7 18 12 18C10.3 18 9 16.7 9 15V10C9 9.4 9.4 9 10 9Z"/></svg>`;
    
    // Random start edge
    const edge = Math.floor(Math.random()*4);
    let startX, startY;
    switch(edge) {
        case 0: startX=Math.random()*window.innerWidth; startY=-50; break;
        case 1: startX=window.innerWidth+50; startY=Math.random()*window.innerHeight; break;
        case 2: startX=Math.random()*window.innerWidth; startY=window.innerHeight+50; break;
        case 3: startX=-50; startY=Math.random()*window.innerHeight; break;
    }
    
    const endX = Math.random()*window.innerWidth;
    const endY = Math.random()*window.innerHeight;
    
    // rotation calculation
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI + 90;
    
    roach.style.left = startX + 'px';
    roach.style.top = startY + 'px';
    roach.style.transform = `rotate(${angle}deg)`;
    
    document.body.appendChild(roach);
    
    gsap.to(roach, {
        x: endX - startX,
        y: endY - startY,
        duration: Math.random() * 2 + 1,
        ease: "power1.inOut",
        onComplete: () => {
            gsap.to(roach, {opacity: 0, duration: 0.5, onComplete: () => roach.remove()});
        }
    });
}

function initCockroachCanvas() {
  const canvas = document.getElementById('roach-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if(!ctx) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const roaches: any[] = [];
  const maxRoaches = window.innerWidth > 768 ? 150 : 50;

  for(let i=0; i<maxRoaches; i++) {
    roaches.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      angle: 0,
      size: Math.random() * 15 + 5
    });
  }

  function drawRoach(x: number, y: number, angle: number, size: number) {
    if(!ctx) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = '#1a0000';
    // Body oval
    ctx.beginPath();
    ctx.ellipse(0, 0, size/2, size, 0, 0, Math.PI * 2);
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.arc(0, -size, size/2.5, 0, Math.PI * 2);
    ctx.fill();
    // Antennae
    ctx.strokeStyle = '#1a0000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(-size, -size * 2);
    ctx.moveTo(0, -size);
    ctx.lineTo(size, -size * 2);
    ctx.stroke();
    // Simple Legs
    ctx.beginPath();
    ctx.moveTo(-size/2, 0); ctx.lineTo(-size, -size/2);
    ctx.moveTo(size/2, 0); ctx.lineTo(size, -size/2);
    ctx.moveTo(-size/2, size/2); ctx.lineTo(-size, size);
    ctx.moveTo(size/2, size/2); ctx.lineTo(size, size);
    ctx.stroke();
    ctx.restore();
  }

  function animate() {
    if(!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    roaches.forEach(r => {
      // Jitter
      r.vx += (Math.random() - 0.5) * 0.5;
      r.vy += (Math.random() - 0.5) * 0.5;
      // Max speed limit
      const speed = Math.sqrt(r.vx*r.vx + r.vy*r.vy);
      if(speed > 3) {
        r.vx = (r.vx/speed) * 3;
        r.vy = (r.vy/speed) * 3;
      }

      r.x += r.vx;
      r.y += r.vy;

      // Wrap around
      if(r.x < -20) r.x = canvas.width + 20;
      if(r.x > canvas.width + 20) r.x = -20;
      if(r.y < -20) r.y = canvas.height + 20;
      if(r.y > canvas.height + 20) r.y = -20;

      r.angle = Math.atan2(r.vy, r.vx) + Math.PI/2;

      drawRoach(r.x, r.y, r.angle, r.size);
    });

    requestAnimationFrame(animate);
  }

  animate();
}
