// Loading Screen Animation
        document.addEventListener('DOMContentLoaded', function() {
            const loadingText = document.getElementById('loading-text');
            const typewriter = new Typewriter(loadingText, {
                loop: true,
                delay: 60,
            });
            
            typewriter
                .typeString('Preparing your dining experience')
                .pauseFor(500)
                .typeString('...')
                .pauseFor(1000)
                .deleteChars(3)
                .typeString('...')
                .pauseFor(1000)
                .start();
                
            // Hide loading screen after delay
            setTimeout(() => {
                document.getElementById('loading-screen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading-screen').style.display = 'none';
                }, 1000);
            }, 3000);
            
            // Initialize main typewriter
            const mainTypewriter = new Typewriter(document.getElementById('typewriter'), {
                loop: true,
                delay: 60,
                deleteSpeed: 30,
            });
            
            mainTypewriter
                .typeString('Where passion meets cuisine')
                .pauseFor(1000)
                .deleteAll()
                .typeString('Michelin-starred dining experience')
                .pauseFor(1000)
                .deleteAll()
                .typeString('Locally sourced ingredients')
                .pauseFor(1000)
                .deleteAll()
                .typeString('Art on every plate')
                .pauseFor(1000)
                .start();
            
            // Initialize 3D scene
            init3DScene();
            
            // Scroll animations
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                const navbar = document.querySelector('nav');
                
                if (scrollPosition > 50) {
                    navbar.classList.add('shadow-lg');
                    navbar.classList.add('py-2');
                } else {
                    navbar.classList.remove('shadow-lg');
                    navbar.classList.remove('py-2');
                }
                
                // Animate elements on scroll
                animateOnScroll();
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Reservation form handling
            const reservationForm = document.querySelector('.reservation-form');
            if (reservationForm) {
                reservationForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Thank you for your reservation! We will contact you shortly to confirm.');
                    this.reset();
                });
            }
        });
        
        function animateOnScroll() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('animate__animated', 'animate__fadeInUp');
                }
            });
        }
        
        function init3DScene() {
            const container = document.getElementById('canvas-container');
            
            // Only initialize if WebGL is supported
            if (!Detector.webgl) return;
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);
            
            // Create floating food items
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const materials = [
                new THREE.MeshBasicMaterial({ color: 0xff6b00 }), // Orange
                new THREE.MeshBasicMaterial({ color: 0x8b4513 }), // Brown
                new THREE.MeshBasicMaterial({ color: 0x228b22 }), // Green
                new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
            ];
            
            const foodItems = [];
            for (let i = 0; i < 15; i++) {
                const material = materials[Math.floor(Math.random() * materials.length)];
                const mesh = new THREE.Mesh(geometry, material);
                
                // Random positions and sizes
                mesh.position.x = Math.random() * 20 - 10;
                mesh.position.y = Math.random() * 20 - 10;
                mesh.position.z = Math.random() * 20 - 10;
                
                const size = Math.random() * 0.5 + 0.3;
                mesh.scale.set(size, size, size);
                
                // Store a random speed for animation
                mesh.userData = {
                    speed: {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    }
                };
                
                scene.add(mesh);
                foodItems.push(mesh);
            }
            
            camera.position.z = 5;
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                // Rotate food items
                foodItems.forEach(item => {
                    item.rotation.x += item.userData.speed.x;
                    item.rotation.y += item.userData.speed.y;
                    item.rotation.z += item.userData.speed.z;
                });
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Handle window resize
            window.addEventListener('resize', function() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }