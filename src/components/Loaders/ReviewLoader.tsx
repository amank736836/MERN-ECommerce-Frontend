import { SkeletonLoader } from "./SkeletonLoader";

const ReviewLoader = () => {
  return (
    <>
      <article
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <SkeletonLoader
          width="5vw"
          height="10vh"
          length={1}
          flexDir="row"
          margin="1rem 0"
        />
        <SkeletonLoader
          width="12vw"
          height="10px"
          length={3}
          flexDir="column"
          margin="1rem 0"
        />
        <SkeletonLoader
          width="5vw"
          height="10vh"
          length={1}
          flexDir="row"
          margin="1rem 0"
        />
        <SkeletonLoader
          width="12vw"
          height="10px"
          length={3}
          flexDir="column"
          margin="1rem 0"
        />
        <SkeletonLoader
          width="5vw"
          height="10vh"
          length={1}
          flexDir="row"
          margin="1rem 0"
        />
        <SkeletonLoader
          width="12vw"
          height="10px"
          length={3}
          flexDir="column"
          margin="1rem 0"
        />
        <SkeletonLoader
          width="5vw"
          height="10vh"
          length={1}
          flexDir="row"
          margin="1rem 0"
        />
        <SkeletonLoader
          width="12vw"
          height="10px"
          length={3}
          flexDir="column"
          margin="1rem 0"
        />
        <SkeletonLoader
          width="5vw"
          height="10vh"
          length={1}
          flexDir="row"
          margin="1rem 0"
        />
        <SkeletonLoader
          width="12vw"
          height="10px"
          length={3}
          flexDir="column"
          margin="1rem 0"
        />
      </article>
    </>
  );
};

export default ReviewLoader;
