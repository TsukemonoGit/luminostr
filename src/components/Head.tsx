import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";

export default function Head() {
  return (
    <MetaProvider>
      <Title>Luminostr</Title>
      <Link rel="icon" href="./favicon.svg" />
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content="Luminostr" />
      <Meta
        property="og:image"
        content={`${window.location.origin}${
          import.meta.env.BASE_URL
        }favicon.svg`}
      />
      <Meta property="og:description" content="Event Recovery Tool" />
    </MetaProvider>
  );
}
