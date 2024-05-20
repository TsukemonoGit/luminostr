import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";

export default function Head() {
  return (
    <MetaProvider>
      <Title>Luminostr</Title>
    </MetaProvider>
  );
}
