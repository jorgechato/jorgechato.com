import { useTheme } from '@/components/core/ThemeProvider';
import { Model as Bridge } from '@/components/models/Bridge';
import { Model as Door } from '@/components/models/Door';
import { Model as Floor } from '@/components/models/Island';
import { Model as Rooster } from '@/components/models/Rooster';
import { Model as Sakura } from '@/components/models/Sakura';
import { Model as Soju } from '@/components/models/Soju';
import { Model as Torii } from '@/components/models/Torii';
import { CameraControls, MeshPortalMaterial, OrbitControls, Text, useTexture } from '@react-three/drei';
import { Canvas, extend } from '@react-three/fiber';
import { RoundedPlaneGeometry } from 'maath/geometry';
import React from 'react';

extend({ RoundedPlaneGeometry });

const GOLDENRATIO = 1.61803398875;
const PADDING = 0.02;
const ROUND = {
  outer: 0.05,
  inner: 0.05,
};
const URL = '/profile.webp';

function FrameImage({ url, width, height, bg, scale }: { url: string; width: number; height: number; bg: string; scale: number[] }) {
  const texture = useTexture(url);

  return (
    <mesh position={[0, 0.4, 0.001]}>
      <mesh>
        <roundedPlaneGeometry args={[width + PADDING, height + PADDING, 0.25]} />
        <meshBasicMaterial color={bg} />
      </mesh>

      <mesh position={[0, 0, 0.001]}>
        <roundedPlaneGeometry args={[...scale, 0.25]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </mesh>
  );
}

interface FrameProps {
  name: string;
  bg: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}
function Frame({ name, bg, width = 1, height = GOLDENRATIO, children, ...props }: FrameProps) {
  const { resolvedTheme } = useTheme();

  return (
    <mesh {...props}>
      {/* frame */}
      <mesh>
        <roundedPlaneGeometry args={[width, height, ROUND.inner]} />
        <MeshPortalMaterial>
          {children}

          {/* Light */}
          <ambientLight intensity={resolvedTheme === 'dark' ? 0.8 : 1.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={resolvedTheme === 'dark' ? 0.8 : 1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* BG Color */}
          <color attach="background" args={[resolvedTheme === 'dark' ? '#27272a' : '#fff']} />

          <Text
            fontSize={0.09}
            position={[0, 0.01, 0]}
            anchorX="center"
            anchorY="middle"
            material-color={resolvedTheme === 'dark' ? bg : 'black'}
            outlineWidth={resolvedTheme === 'dark' ? 0 : 0.002}
            outlineColor="black"
          >
            @jorgechato
          </Text>

          <OrbitControls />
        </MeshPortalMaterial>
      </mesh>

      {/* border */}
      <mesh position={[0, 0, -0.001]}>
        <roundedPlaneGeometry args={[width + PADDING, height + PADDING, ROUND.outer]} />
        <meshBasicMaterial color={bg} />
      </mesh>

      {/* image */}
      <FrameImage url={URL} width={0.5} height={0.5} scale={[0.5, 0.5]} bg={bg} />
    </mesh>
  );
}

// Main component that sets up the Canvas and includes our Square
export function ThreeD({ name, bg }: { name: string; bg: string }) {
  const { resolvedTheme } = useTheme();

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 1.5] }} gl={{ localClippingEnabled: true }} shadows>
        <Frame name={name} bg={bg} width={1} height={GOLDENRATIO}>
          <Floor position={[0, -0.7, -0.2]} scale={[0.6, 0.6, 0.6]} rotation={[0, -Math.PI / 2, 0]} />
          <Rooster position={[-0.3, -0.73, -0.3]} scale={[0.025, 0.025, 0.025]} rotation={[0, -Math.PI / 2 + 0.6, 0]} />
          <Torii position={[0.65, -0.38, -0.20]} scale={[0.5, 0.5, 0.5]} rotation={[0, Math.PI, 0]} />
          <Door position={[0.07, -0.32, -0.3]} scale={[0.009, 0.009, 0.005]} rotation={[0, Math.PI / 7, 0]} />
          <Sakura position={[-0.4, -0.75, -0.3]} scale={[0.002, 0.002, 0.002]} rotation={[0, -Math.PI / 3, 0]} />
          <Soju position={[0.29, -0.56, -0.24]} scale={[0.05, 0.05, 0.05]} rotation={[0, Math.PI, 0]} />
          <Bridge position={[0.39, -0.49, -0.15]} scale={[0.00026, 0.0002, 0.0002]} rotation={[0, 0.1, -0.25]} />
        </Frame>

        <CameraControls
          makeDefault
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 2}
          minDistance={1}
          maxDistance={2}
        />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
