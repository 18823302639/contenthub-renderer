import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = Math.min(1, frame / (fps * 0.5));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Noto Sans CJK SC', 'Noto Sans SC', sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: "bold",
          color: "#e94560",
          opacity,
          textAlign: "center",
        }}
      >
        你好，Remotion！
      </div>
      <div
        style={{
          fontSize: 30,
          color: "#0f3460",
          marginTop: 20,
          opacity: Math.min(1, (frame - fps * 0.3) / (fps * 0.5)),
        }}
      >
        中文渲染测试成功 🎉
      </div>
    </AbsoluteFill>
  );
};
