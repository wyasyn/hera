import BackButton from "@/components/back-button";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
}

export default async function SingleServicePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  return (
    <div>
      <BackButton />
      {slug}
    </div>
  );
}
