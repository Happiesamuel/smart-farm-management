import Image from "next/image";
import Img from "../../public/farm.jpeg";
export default function DashboardFarm() {
  const farms = {
    id: "farm_1",
    name: "My Village Farm",
    location: "Ibadan, Nigeria",
    size: "5 Acres",

    totalFields: 3,
    totalCrops: 3,
    totalHarvests: 2,
  };

  return (
    <div className=" lg:flex-[0.6]  lg:w-[30%] size-ful aspect-video  bg-white relative  rounded-xl border border-border/80 shadow shadow-dark/10 flex flex-col h-[300px] lg:h-[300px] shrink-0">
      <div className="absolute size-full bg-black/20 rounded-xl z-1" />
      <div className="absolute bottom-5 bg-white rounded-xl p-4 w-[90%] self-center  z-10">
        <div className="flex items-center justify-between pb-3">
          <h6 className="text-sm text-dark font-semibold">{farms.name}</h6>
          {/* <p> farm name will be a select field where users can change different farms</p> */}
          <p className="text-xs text-primary-green cursor-pointer border border-border p-1 px-2 rounded-md font-semibold">
            View Farm
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 lg:gap-1 xl:gap-3 gap-3">
          <div className="border w-full border-border shadow shadow-border/50 rounded-md space-y-1 p-1.5">
            <p className="text-xs text-zinc-500 font-normal">Total Field</p>
            <p className="text-sm font-semibold text-dark">3</p>
          </div>
          <div className="border w-full border-border shadow shadow-border/50 rounded-md space-y-1 p-1.5">
            <p className="text-xs text-zinc-500 font-normal">Size</p>
            <p className="text-sm font-semibold text-dark">{farms.size}</p>
          </div>
          <div className="border lg:col-span-2 xl:col-span-1 w-full border-border shadow shadow-border/50 rounded-md space-y-1 p-1.5">
            <p className="text-xs text-zinc-500 font-normal">Total Havest</p>
            <p className="text-sm font-semibold text-dark">
              {farms.totalHarvests}
            </p>
          </div>
        </div>
      </div>
      <Image
        src={Img}
        className="size-full h-full object-center object-cover rounded-xl"
        fill
        alt="farm"
      />
    </div>
  );
}
