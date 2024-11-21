interface SkeletonProps {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  length?: number;
  maxWidth?: string;
  flexDir?:
    | "row"
    | "column"
    | "unset"
    | "row-reverse"
    | "column-reverse"
    | undefined;
    containerHeight?: string;
}

export const SkeletonLoader = ({
  width = "unset",
  height = "unset",
  flexDir = "unset",
  margin = "unset",
  padding = "unset",
  maxWidth = "unset",
  containerHeight = "unset",
  length = 3,
}: SkeletonProps) => {
  const skeletons = Array.from({ length }, (_, index) => (
    <div
      key={index}
      className="skeletonShape"
      style={{ width, height, maxWidth }}
    ></div>
  ));
  return (
    <div
      className="skeletonLoader"
      style={{
        flexDirection: flexDir,
        margin: margin,
        padding: padding,
        height: containerHeight,
      }}
    >
      {skeletons}
    </div>
  );
};
