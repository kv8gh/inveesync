import { useRouter } from "next/router";
import { useEffect } from "react";
import data from "./data.json"; 

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Store JSON data in local storage
    localStorage.setItem("inventoryData", JSON.stringify(data));
  }, []);

  return (
    <main className="h-screen min-w-screen flex justify-center items-center">
      <div className="h-fit p-4 border border-black flex flex-col justify-center ">
        <span className="text-green-600 text-2xl font-extrabold flex justify-center">
          Welcome to InveeSync
        </span>
        <br></br>
        <br></br>
        <div className="text-black flex flex-col justify-around gap-3">
          <div className="uppercase flex justify-center">
            select an option
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-evenly">
            <button
              type="button"
              onClick={() => router.push("/orders")}
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Order List
            </button>

            <button
              type="button"
              onClick={() => router.push("/inventory")}
              className="py-2.5 px-8 md:px-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Items
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
