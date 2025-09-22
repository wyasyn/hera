import Footer from "../(main)/_components/footer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      <main className=" flex-1 ">{children}</main>
      <Footer />
    </div>
  );
}
