export default function Loading() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen bg-color1">
      <img
        src="/Images/logo.png"
        alt=""
        className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
      />
    </div>
  );
}
