import CreateForm from "@/components/room/CreateForm";
const page = () => {
    return (<div className="w-screen h-screen relative flex items-center justify-center">
      <h1 className="fixed text-white top-2 left-3 text-3xl font-pencerio font-bold">
        meetdraw/ Create
      </h1>
      <div className="absolute h-[150px] w-[300px] -translate-y-25 -translate-x-15 bg-linear-90 from-green-500 via-green-500 to-green-400 z-1 blur-[120px]"/>
      <CreateForm />
    </div>);
};
export default page;
