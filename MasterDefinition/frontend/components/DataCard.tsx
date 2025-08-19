import { IDataCard } from "@/lib/Types";

const DataCard = ({ data }: { data: IDataCard }) => {
  return (
    <div className="m-2 bg-neutral-800 w-80 py-7 rounded-2xl flex items-center justify-center flex-col gap-4">
      <h1 className="font-bold text-xl">{data.title}</h1>
      <div className="flex flex-col items-center justify-center pt-5 gap-2">
        <h1 className={`font-bold text-2xl text-center ${data.fontColor}`}>
          {data.data}
        </h1>
        <p className="font-light text-md">{data.subtitle}</p>
      </div>
    </div>
  );
};

export default DataCard;
