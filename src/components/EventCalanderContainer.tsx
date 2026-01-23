import Image from "next/image";
import EventList from "./EventList";
import EvenetCalander from "./EventCalander";

const EventCalanderContainer = async ({ searchParams }: { searchParams: { [keys: string]: string | undefined } }) => {
    
const {date} = searchParams;

  return (
    <>
      <div className="bg-white p-4 flex flex-col gap-8">
        <EvenetCalander />
        <div className="events">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-lg font-semibold ">Events</span>
            <Image src="/moreDark.png" alt="" width={20} height={20} />
          </div>
          <div className="flex flex-col gap-4">
            <EventList dateParam = {date} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCalanderContainer;
