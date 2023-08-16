export default function Page({ params }: { params: { nameID: string } }) {
  return <div>Test: {params.nameID}</div>;
}
