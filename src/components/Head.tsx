import { Link, Meta, Title } from "@solidjs/meta";
import { useLanguage } from "./util/useLanguage";

export default function Head() {
  const [, , isJapanese] = useLanguage();

  return (
    <>
      <Title>Luminostr</Title>
      <Link rel="icon" href="./favicon.svg" />
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content="Luminostr" />
      <Meta
        property="og:image"
        content={`${window.location.origin}/favicon.svg`}
      />
      <Meta
        property="og:description"
        content={`${
          isJapanese()
            ? "置換可能（replaceable）イベントのリカバリーツール"
            : "Replacementable Event Recovery Tool"
        }`}
      />
    </>
  );
}
