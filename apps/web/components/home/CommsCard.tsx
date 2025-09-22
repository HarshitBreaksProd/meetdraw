import LinkButton from "./LinkButton";

const AppointmentCard = () => {
  return (
    <div className="border rounded-xl p-4 gap-1 flex-1 flex-grow flex-shrink min-h-[120px] max-h-[120px] flex flex-col items-center justify-center backdrop-blur-md bg-black/50">
      <p className="-mb-1">
        Comms System (for voice and video calls) coming soon...
      </p>
      <p className="text-sm text-neutral-600">
        Show support by giving the repo a star
      </p>
      <LinkButton
        variant="ghost"
        href="https://github.com/HarshitBreaksProd/meetdraw"
      >
        Star
      </LinkButton>
    </div>
  );
};

export default AppointmentCard;
