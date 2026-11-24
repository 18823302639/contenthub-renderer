import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { DataStory, calculateMetadata } from "./DataStory";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComposition"
        component={MyComposition}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DataStory-16x9"
        component={DataStory}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        calculateMetadata={calculateMetadata}
        defaultProps={{
          title: "示例标题",
          source: "示例来源",
          scenes: [
            {
              heading: "示例分镜",
              caption: "示例字幕",
              durationInSeconds: 5,
              chartData: [
                { label: "A", value: 50 },
                { label: "B", value: 30 },
              ],
            },
          ],
        }}
      />
      <Composition
        id="DataStory-9x16"
        component={DataStory}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        calculateMetadata={calculateMetadata}
        defaultProps={{
          title: "示例标题",
          source: "示例来源",
          scenes: [
            {
              heading: "示例分镜",
              caption: "示例字幕",
              durationInSeconds: 5,
              chartData: [
                { label: "A", value: 50 },
                { label: "B", value: 30 },
              ],
            },
          ],
        }}
      />
    </>
  );
};
