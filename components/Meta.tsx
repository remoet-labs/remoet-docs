import { CldOgImage } from "next-cloudinary";
import Header from "./Head";

const Meta = () => {
  return (
    <>
      <Header />

      <CldOgImage
        src="blog/logo"
        alt="og image"
        width="2400"
        height="1200"
        title="Fully remote companies hiring engineers in 2024 - remoet.dev"
      />
    </>
  );
};

export default Meta;
