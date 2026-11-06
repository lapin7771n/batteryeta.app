import { Environment, Lightformer, Sparkles } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { useMotionValueEvent, type MotionValue } from "motion/react"
import { useMemo, useRef } from "react"
import {
  Color,
  Curve,
  MathUtils,
  TubeGeometry,
  Vector3,
  type Group,
  type Mesh,
} from "three"
import {
  clamp01,
  GLASS_RADIUS,
  GLASS_ROUGHNESS,
  GREEN,
  LIQUID_RADIUS,
  RING_RADIUS,
  START_DEG,
  SWEEP_DEG,
  TRACK,
  TRACK_RADIUS,
} from "./ring-spec"

const ARC_SEGMENTS = 270
const LIQUID_RADIAL_SEGMENTS = 16
const PITCH = -0.2
const YAW_PER_FILL = 1.1
const YAW_DAMPING = 3

class ArcCurve extends Curve<Vector3> {
  constructor() {
    super()
  }

  getPoint(t: number, target = new Vector3()): Vector3 {
    const angle = MathUtils.degToRad(START_DEG - SWEEP_DEG * t)
    return target.set(
      RING_RADIUS * Math.cos(angle),
      RING_RADIUS * Math.sin(angle),
      0
    )
  }
}

const ARC = new ArcCurve()

const TIP_COLOR = new Color(GREEN).multiplyScalar(2.6)

type GaugeProps = {
  progress: MotionValue<number>
  reduceMotion: boolean
  onFirstFrame: () => void
}

function Gauge({ progress, reduceMotion, onFirstFrame }: GaugeProps) {
  const invalidate = useThree((state) => state.invalidate)
  const turn = useRef<Group>(null)
  const tip = useRef<Mesh>(null)
  const cap = useRef<Mesh>(null)
  const yaw = useRef(0)
  const framed = useRef(false)
  const point = useMemo(() => new Vector3(), [])

  const glass = useMemo(
    () => new TubeGeometry(ARC, ARC_SEGMENTS, GLASS_RADIUS, 24, false),
    []
  )
  const track = useMemo(
    () => new TubeGeometry(ARC, ARC_SEGMENTS, TRACK_RADIUS, 16, false),
    []
  )
  const liquid = useMemo(() => {
    const geometry = new TubeGeometry(
      ARC,
      ARC_SEGMENTS,
      LIQUID_RADIUS,
      LIQUID_RADIAL_SEGMENTS,
      false
    )
    geometry.setDrawRange(0, 0)
    return geometry
  }, [])
  const start = useMemo(() => ARC.getPoint(0), [])
  const end = useMemo(() => ARC.getPoint(1), [])

  useMotionValueEvent(progress, "change", () => invalidate())

  useFrame((_, delta) => {
    const fill = clamp01(progress.get())
    const segments = Math.round(fill * ARC_SEGMENTS)
    liquid.setDrawRange(0, segments * LIQUID_RADIAL_SEGMENTS * 6)
    const visible = segments > 0 ? 1 : 0
    tip.current?.position.copy(ARC.getPoint(fill, point))
    tip.current?.scale.setScalar(visible)
    cap.current?.scale.setScalar(visible)

    const targetYaw = reduceMotion ? 0 : fill * YAW_PER_FILL
    yaw.current = MathUtils.damp(yaw.current, targetYaw, YAW_DAMPING, delta)
    if (turn.current) turn.current.rotation.y = yaw.current
    if (Math.abs(yaw.current - targetYaw) > 0.001) invalidate()

    if (!framed.current) {
      framed.current = true
      requestAnimationFrame(onFirstFrame)
    }
  })

  return (
    <group rotation={[PITCH, 0, 0]}>
      <group ref={turn}>
        <mesh geometry={glass}>
          <meshPhysicalMaterial
            color="#EBFAF7"
            transmission={1}
            thickness={0.4}
            roughness={GLASS_ROUGHNESS}
            ior={1.46}
            specularIntensity={0.7}
          />
        </mesh>
        <mesh geometry={track}>
          <meshStandardMaterial color={TRACK} roughness={0.22} />
        </mesh>
        <mesh geometry={liquid}>
          <meshStandardMaterial
            color={GREEN}
            emissive={GREEN}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
        {[start, end].map((position) => (
          <group key={position.toArray().join()} position={position}>
            <mesh>
              <sphereGeometry args={[GLASS_RADIUS, 32, 16]} />
              <meshPhysicalMaterial
                color="#EBFAF7"
                transmission={1}
                thickness={0.4}
                roughness={GLASS_ROUGHNESS}
                ior={1.46}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[TRACK_RADIUS, 24, 12]} />
              <meshStandardMaterial color={TRACK} roughness={0.22} />
            </mesh>
          </group>
        ))}
        <mesh ref={cap} position={start} scale={0}>
          <sphereGeometry args={[LIQUID_RADIUS, 24, 12]} />
          <meshStandardMaterial
            color={GREEN}
            emissive={GREEN}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={tip} position={start} scale={0}>
          <sphereGeometry args={[LIQUID_RADIUS, 24, 12]} />
          <meshBasicMaterial color={TIP_COLOR} toneMapped={false} />
        </mesh>
      </group>
      <Sparkles
        count={28}
        scale={[5, 4, 2]}
        size={3}
        speed={0.3}
        opacity={0.6}
        color="#B3D9FF"
      />
    </group>
  )
}

type RingSceneProps = {
  progress: MotionValue<number>
  reduceMotion: boolean
  onReady: () => void
}

export default function RingScene({
  progress,
  reduceMotion,
  onReady,
}: RingSceneProps) {
  return (
    <Canvas
      frameloop="demand"
      resize={{ offsetSize: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 30 }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={4}
          position={[-3, 3, 4]}
          scale={[4, 3, 1]}
          color="#E6F5FF"
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[4, 0, 3]}
          scale={[1, 5, 1]}
          color="#D9FFF2"
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[-4, -1, 2]}
          scale={[1, 4, 1]}
          color="#CCE6FF"
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 4, 3]}
          scale={[5, 1, 1]}
          color="#FFFFFF"
          target={[0, 0, 0]}
        />
      </Environment>
      <Gauge
        progress={progress}
        reduceMotion={reduceMotion}
        onFirstFrame={onReady}
      />
      <EffectComposer multisampling={4}>
        <Bloom
          mipmapBlur
          blendFunction={BlendFunction.ADD}
          intensity={0.6}
          radius={0.6}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.2}
        />
      </EffectComposer>
    </Canvas>
  )
}
