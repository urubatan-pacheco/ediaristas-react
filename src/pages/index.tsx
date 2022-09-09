import Advantages from "@partials/index/_advantages";
import FrequentQuestions from "@partials/index/_frequent-questions";
import Presentation from "@partials/index/_presentation";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "início",
    },
  };
};

export default function Index() {
  return (
    <div>
      <Presentation />
      <Advantages />
      <FrequentQuestions />
    </div>
  );
}
