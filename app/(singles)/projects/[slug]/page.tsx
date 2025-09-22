type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
}

export default async function SingleProjectPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  return <div>{slug}</div>;
}
