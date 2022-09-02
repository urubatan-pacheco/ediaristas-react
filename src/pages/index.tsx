import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "início",
    },
  };
};

export default function Index() {
  return <div></div>;
}
