import { SkeletonLoader } from "./SkeletonLoader";

const ProductLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        height: "80vh",
        border: "1px solid #f1f1f1",
      }}
    >
      <section
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <SkeletonLoader
          width="100%"
          height="100%"
          containerHeight="100%"
          length={1}
          flexDir="column"
        />
      </section>
      <section
        style={{
          width: "100%",
          // border: "1px solid blue",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          padding: "2rem",
        }}
      >
        <SkeletonLoader width="100%" length={3} />
        <SkeletonLoader width="100%" length={2} flexDir="column" />
        <SkeletonLoader width="100%" length={3} />
        <SkeletonLoader width="100%" length={3} flexDir="column" />
        <SkeletonLoader width="100%" length={3} />
        <SkeletonLoader width="100%" length={2} flexDir="column" />
      </section>
    </div>
  );
};

export default ProductLoader;
