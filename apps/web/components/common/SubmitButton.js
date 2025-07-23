import { Button } from "@workspace/ui/components/button";
const SubmitButton = ({ children, pending, loadingText, }) => {
    return (<Button type="submit" disabled={pending} className="overflow-clip relative p-0 cursor-pointer transition-all duration-500 bg-black hover:bg-white text-white hover:text-black border hover:border-black border-green-500/30">
      <div className="w-full h-full px-6 abolute flex items-center justify-center bg-linear-150 from-green-500/70 from-[-50%] via-white/0 via-50% to-green-500/70 to-[160%]">
        {pending ? loadingText : children}
      </div>
    </Button>);
};
export default SubmitButton;
