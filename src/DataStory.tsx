import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  interpolate,
  Sequence,
} from "remotion";

interface ChartItem {
  label: string;
  value: number;
  highlight?: boolean;
}

interface Scene {
  heading: string;
  caption: string;
  durationInSeconds: number;
  chartData: ChartItem[];
  audioUrl?: string;
}

type DataStoryProps = {
  title: string;
  source: string;
  audioUrl?: string;
  scenes: Scene[];
};

const BarChart: React.FC<{ data: ChartItem[]; frame: number; fps: number }> = ({
  data,
  frame,
  fps,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const animDuration = fps * 0.8;

  return (
    <div style={{ width: "80%", maxWidth: 900 }}>
      {data.map((item, i) => {
        const barWidth = interpolate(
          frame - i * 3,
          [0, animDuration],
          [0, (item.value / maxValue) * 100],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 100,
                textAlign: "right",
                paddingRight: 16,
                fontSize: 22,
                color: "#c0c0c0",
                fontFamily: "'Noto Sans CJK SC', 'Noto Sans SC', sans-serif",
                flexShrink: 0,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                flex: 1,
                height: 36,
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: 6,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  background: item.highlight
                    ? "linear-gradient(90deg, #e94560, #ff6b6b)"
                    : "linear-gradient(90deg, #0f3460, #1a508b)",
                  borderRadius: 6,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#ffffff",
                  fontFamily: "'Noto Sans CJK SC', 'Noto Sans SC', sans-serif",
                }}
              >
                {item.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SceneRenderer: React.FC<{
  scene: Scene;
  index: number;
  totalScenes: number;
}> = ({ scene, index, totalScenes }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneDuration = scene.durationInSeconds * fps;

  const headingOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headingSlideY = interpolate(frame, [0, 15], [30, 0], {
    extrapolateRight: "clamp",
  });
  const captionOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const progressWidth = interpolate(
    frame,
    [0, sceneDuration],
    [0, 100],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 40%, #16213e 100%)",
        fontFamily: "'Noto Sans CJK SC', 'Noto Sans SC', sans-serif",
      }}
    >
      {/* 分镜配音 */}
      {scene.audioUrl && <Audio src={scene.audioUrl} />}

      {/* 顶部进度条 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 4,
          width: `${progressWidth}%`,
          background: "linear-gradient(90deg, #e94560, #ff6b6b)",
          zIndex: 10,
        }}
      />

      {/* 场景指示器 */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 30,
          fontSize: 16,
          color: "#666",
          fontFamily: "'Noto Sans CJK SC', 'Noto Sans SC', sans-serif",
        }}
      >
        {index + 1} / {totalScenes}
      </div>

      {/* 主内容区 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 40px 80px",
        }}
      >
        <h2
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: 40,
            opacity: headingOpacity,
            transform: `translateY(${headingSlideY}px)`,
            textAlign: "center",
          }}
        >
          {scene.heading}
        </h2>
        <BarChart data={scene.chartData} frame={frame} fps={fps} />
      </div>

      {/* 底部字幕条 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(0deg, rgba(233,69,96,0.25) 0%, transparent 100%)",
          padding: "30px 40px 40px",
          opacity: captionOpacity,
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          {scene.caption}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DataStory: React.FC<DataStoryProps> = ({
  title,
  source,
  audioUrl,
  scenes,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let currentFrame = 0;
  const sceneRanges = scenes.map((scene) => {
    const start = currentFrame;
    const duration = scene.durationInSeconds * fps;
    currentFrame += duration;
    return { start, duration };
  });

  const introDuration = 2 * fps;
  const introOpacity = interpolate(
    frame,
    [0, 15, introDuration - 15, introDuration],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const totalContentFrames = currentFrame;
  const outroStart = totalContentFrames;
  const outroDuration = 2 * fps;
  const outroOpacity = interpolate(
    frame,
    [outroStart, outroStart + 15, outroStart + outroDuration - 15, outroStart + outroDuration],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 40%, #16213e 100%)",
        fontFamily: "'Noto Sans CJK SC', 'Noto Sans SC', sans-serif",
      }}
    >
      {audioUrl && <Audio src={audioUrl} />}

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: introOpacity,
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#e94560",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {title}
        </h1>
      </AbsoluteFill>

      {scenes.map((scene, i) => {
        const { start, duration } = sceneRanges[i];
        return (
          <Sequence key={i} from={start} durationInFrames={duration}>
            <SceneRenderer
              scene={scene}
              index={i}
              totalScenes={scenes.length}
            />
          </Sequence>
        );
      })}

      <Sequence from={outroStart} durationInFrames={outroDuration}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: outroOpacity,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#888",
              textAlign: "center",
            }}
          >
            数据来源：{source}
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export const calculateMetadata = ({ props, defaultProps }: { props: DataStoryProps; defaultProps: DataStoryProps }) => {
  const data = props || defaultProps;
  const totalSceneSeconds = data.scenes.reduce(
    (sum, s) => sum + s.durationInSeconds,
    0
  );
  const totalSeconds = 2 + totalSceneSeconds + 2;
  const fps = 30;
  return {
    durationInFrames: Math.ceil(totalSeconds * fps),
    props: data,
  };
};
