import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#0a0f1a');
        scene.fog = new THREE.Fog('#0a0f1a', 10, 50);

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 20;

        // Responsive config
        const isMobile = window.innerWidth < 768;
        const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);

        const renderer = new THREE.WebGLRenderer({
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(pixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Materials - More visible glass-like
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x3b82f6,
            metalness: 0.1,
            roughness: 0.15,
            transmission: 0.85,
            thickness: 0.5,
            opacity: 0.25,
            transparent: true,
        });

        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.12
        });

        const glowLineMaterial = new THREE.LineBasicMaterial({
            color: 0x06b6d4,
            transparent: true,
            opacity: 0.25
        });

        // Groups
        const architectureGroup = new THREE.Group();
        const particleGroup = new THREE.Group();
        scene.add(architectureGroup);
        scene.add(particleGroup);

        // Create floating planes (architectural) - LARGER and more prominent
        const createPlane = (w: number, h: number, pos: THREE.Vector3, rot: THREE.Vector3, initialPhase: number) => {
            const geometry = new THREE.PlaneGeometry(w, h);
            const mesh = new THREE.Mesh(geometry, glassMaterial.clone());
            mesh.position.copy(pos);
            mesh.rotation.set(rot.x, rot.y, rot.z);
            mesh.userData = {
                initialPos: pos.clone(),
                phase: initialPhase,
                floatSpeed: 0.3 + Math.random() * 0.2,
                floatAmplitude: 0.5 + Math.random() * 0.5
            };

            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(edges, wireframeMaterial);
            mesh.add(line);

            architectureGroup.add(mesh);
            return mesh;
        };

        // Create geometric elements - MORE and LARGER
        const planes: THREE.Mesh[] = [];
        planes.push(createPlane(6, 4, new THREE.Vector3(-10, 4, -12), new THREE.Vector3(0.15, 0.3, 0), 0));
        planes.push(createPlane(5, 3, new THREE.Vector3(-6, -2, -8), new THREE.Vector3(0.08, 0.2, 0.05), 1));
        planes.push(createPlane(4, 2.5, new THREE.Vector3(8, 1, -10), new THREE.Vector3(0.1, -0.25, 0), 2));
        if (!isMobile) {
            planes.push(createPlane(7, 4, new THREE.Vector3(-12, -4, -15), new THREE.Vector3(0.05, 0.15, 0), 3));
            planes.push(createPlane(4, 3, new THREE.Vector3(10, 4, -12), new THREE.Vector3(0.12, -0.18, 0.03), 4));
            planes.push(createPlane(3, 2, new THREE.Vector3(5, -4, -8), new THREE.Vector3(-0.1, 0.1, 0), 5));
        }

        // Create cubes - MORE visible
        const createCube = (size: number, pos: THREE.Vector3, initialPhase: number) => {
            const geometry = new THREE.BoxGeometry(size, size, size);
            const edges = new THREE.EdgesGeometry(geometry);
            const cube = new THREE.LineSegments(edges, wireframeMaterial.clone());
            (cube.material as THREE.LineBasicMaterial).opacity = 0.18;
            cube.position.copy(pos);
            cube.userData = {
                initialPos: pos.clone(),
                phase: initialPhase,
                rotSpeed: 0.02 + Math.random() * 0.02
            };
            architectureGroup.add(cube);
            return cube;
        };

        const cubes: THREE.LineSegments[] = [];
        cubes.push(createCube(2, new THREE.Vector3(6, 2, -10), 0));
        cubes.push(createCube(1.5, new THREE.Vector3(9, -3, -8), 1));
        cubes.push(createCube(1.2, new THREE.Vector3(-8, 0, -7), 2));
        if (!isMobile) {
            cubes.push(createCube(2.5, new THREE.Vector3(12, 5, -14), 3));
            cubes.push(createCube(1.8, new THREE.Vector3(-10, -5, -12), 4));
        }

        // Floating particles
        const particleCount = isMobile ? 30 : 80;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const particleData: { x: number; y: number; z: number; vx: number; vy: number }[] = [];

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 40;
            const y = (Math.random() - 0.5) * 30;
            const z = -5 - Math.random() * 20;
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            particleData.push({
                x, y, z,
                vx: (Math.random() - 0.5) * 0.01,
                vy: (Math.random() - 0.5) * 0.008
            });
        }
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: isMobile ? 0.08 : 0.05,
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particleGroup.add(particles);

        // Connection lines - MORE and MORE visible
        const createLine = (start: THREE.Vector3, end: THREE.Vector3) => {
            const points = [start, end];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, glowLineMaterial);
            architectureGroup.add(line);
            return line;
        };

        createLine(new THREE.Vector3(-6, -2, -8), new THREE.Vector3(6, 2, -10));
        createLine(new THREE.Vector3(-10, 4, -12), new THREE.Vector3(9, -3, -8));
        createLine(new THREE.Vector3(8, 1, -10), new THREE.Vector3(-8, 0, -7));
        if (!isMobile) {
            createLine(new THREE.Vector3(-12, -4, -15), new THREE.Vector3(12, 5, -14));
        }

        // Lighting - BRIGHTER
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x3b82f6, 1.2, 40);
        pointLight1.position.set(8, 8, 8);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x06b6d4, 0.8, 35);
        pointLight2.position.set(-8, -6, 6);
        scene.add(pointLight2);

        // Animation
        const clock = new THREE.Clock();
        let mouseX = 0;
        let mouseY = 0;

        const animate = () => {
            const t = clock.getElapsedTime();

            // Main group slow drift
            const groupFloat = Math.sin(t * 0.15) * 0.3 + Math.sin(t * 0.08) * 0.15;
            const groupRotate = Math.sin(t * 0.1) * 0.04;
            architectureGroup.position.y = groupFloat;
            architectureGroup.rotation.y = groupRotate;
            architectureGroup.rotation.x = Math.sin(t * 0.07) * 0.02;

            // Individual plane floating - INDEPENDENT MOTION
            planes.forEach((plane) => {
                const data = plane.userData;
                const offset = Math.sin(t * data.floatSpeed + data.phase) * data.floatAmplitude;
                plane.position.y = data.initialPos.y + offset;
                plane.position.x = data.initialPos.x + Math.sin(t * data.floatSpeed * 0.7 + data.phase) * 0.3;
                plane.rotation.z = Math.sin(t * 0.1 + data.phase) * 0.03;
            });

            // Cube rotation - CONTINUOUS
            cubes.forEach((cube) => {
                const data = cube.userData;
                cube.rotation.x = t * data.rotSpeed + data.phase;
                cube.rotation.y = t * data.rotSpeed * 0.8 + data.phase * 0.5;
                const offset = Math.sin(t * 0.25 + data.phase) * 0.4;
                cube.position.y = data.initialPos.y + offset;
            });

            // Particle drift
            const posArray = particleGeometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
                const data = particleData[i];
                data.x += data.vx;
                data.y += data.vy;

                // Wrap around
                if (data.x > 20) data.x = -20;
                if (data.x < -20) data.x = 20;
                if (data.y > 15) data.y = -15;
                if (data.y < -15) data.y = 15;

                posArray[i * 3] = data.x;
                posArray[i * 3 + 1] = data.y;
            }
            particleGeometry.attributes.position.needsUpdate = true;

            // Mouse parallax - MORE responsive
            const targetX = mouseX * 2;
            const targetY = mouseY * 1.5;
            camera.position.x += (targetX - camera.position.x) * 0.03;
            camera.position.y += (targetY - camera.position.y) * 0.03;
            camera.lookAt(0, 0, 0);

            // Light movement
            pointLight1.position.x = 8 + Math.sin(t * 0.3) * 3;
            pointLight2.position.y = -6 + Math.sin(t * 0.25) * 2;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Events
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (mountRef.current?.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            glassMaterial.dispose();
            particleMaterial.dispose();
            particleGeometry.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
};

export default ThreeBackground;
