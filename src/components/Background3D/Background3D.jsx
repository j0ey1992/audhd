import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/web';
import * as THREE from 'three';

const COLORS = {
    primary: '#1A1A1A',
    secondary: '#404040',
    accent: '#FF6B6B',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    'text-secondary': '#707070',
    highlight: '#FFD700',
    meme: '#8A2BE2',
    degen: '#00FF7F',
};

const FloatingShape = ({ position, color, rotationSpeed = 0.01, scale = 1 }) => {
    const meshRef = useRef();
    const initialPosition = useRef(position);
    const initialScale = useRef(scale);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += rotationSpeed;
            meshRef.current.rotation.y += rotationSpeed * 0.8;

            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = initialPosition.current[1] + Math.sin(time) * 0.1;
            
            const breathingScale = initialScale.current + Math.sin(time * 2) * 0.05;
            meshRef.current.scale.set(breathingScale, breathingScale, breathingScale);
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshPhysicalMaterial 
                color={color} 
                roughness={0.3} 
                metalness={0.2}
                transmission={0.1}
                thickness={1.5}
                clearcoat={1}
                clearcoatRoughness={0.1}
            />
        </mesh>
    );
};

const Scene = () => {
    const { camera } = useThree();
    const [{ mouseX, mouseY }, setSpring] = useSpring(() => ({ mouseX: 0, mouseY: 0 }));

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            
            setSpring({
                mouseX: x * 0.15,
                mouseY: y * 0.15,
                config: { mass: 1, tension: 180, friction: 24 }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [setSpring]);

    useFrame(() => {
        camera.position.x += (mouseX.get() - camera.position.x) * 0.1;
        camera.position.y += (mouseY.get() - camera.position.y) * 0.1;
        camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={COLORS.accent} />
            <FloatingShape position={[-2, 1, -3]} color={COLORS.primary} rotationSpeed={0.007} scale={1.2} />
            <FloatingShape position={[2, -1, -2]} color={COLORS.secondary} rotationSpeed={0.005} scale={0.8} />
            <FloatingShape position={[0, 2, -4]} color={COLORS.accent} rotationSpeed={0.003} scale={1.5} />
            <FloatingShape position={[-1, -2, -3]} color={COLORS.primary} rotationSpeed={0.006} scale={0.9} />
            <FloatingShape position={[1.5, 0, -2]} color={COLORS.secondary} rotationSpeed={0.004} scale={1.1} />
            <FloatingShape position={[-1.5, 1.5, -3.5]} color={COLORS.accent} rotationSpeed={0.008} scale={0.7} />
            <FloatingShape position={[2.5, -1.5, -2.5]} color={COLORS.primary} rotationSpeed={0.009} scale={1.3} />
        </>
    );
};

const Background3D = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-background pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(26,26,26,0.03)_0%,transparent_70%)] pointer-events-none"></div>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                className="bg-transparent"
                dpr={[1, 2]}
                gl={{ 
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default Background3D;