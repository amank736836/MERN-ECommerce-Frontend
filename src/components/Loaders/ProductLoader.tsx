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
          gap: "1rem",
          padding: "2rem",
        }}
      >
        <SkeletonLoader width="25%" length={4} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="50%" length={2} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="36%" length={3} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="50%" length={2} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="36%" length={3} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="25%" length={4} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="25%" length={4} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="50%" length={2} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="36%" length={3} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="50%" length={2} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="36%" length={3} flexDir="row" height="2.5rem" />
        <SkeletonLoader width="25%" length={4} flexDir="row" height="2.5rem" />

        <SkeletonLoader
          width="100%"
          length={1}
          flexDir="column"
          height="2rem"
        />
      </section>
    </div>
  );
};

export default ProductLoader;
