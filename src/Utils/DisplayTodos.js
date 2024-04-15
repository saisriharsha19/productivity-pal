import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Todo from "./Todo";

const DisplayTodos = ({
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setTaskDetails,
}) => {

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const completedTask = () => {
    const completed = data.filter((val) => val.check);

    if (data.length) {
      const completePercentage = (completed.length / data.length) * 100;
      return completePercentage.toFixed();
    } else {
      return 0;
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filterResults = data.filter(
      (val) =>
        val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults);
  }, [data, search]);

  const handleTasksStatus = () => {
    const parsePercentage = parseFloat(completedTask());

    if (parsePercentage === 0) {
      return "No tasks completed";
    } else if (parsePercentage === 100) {
      return "All tasks completed";
    } else if (parsePercentage >= 50) {
      return "More than half tasks completed";
    } else {
      return "Less than half tasks completed";
    }
  };

  return (
    <>
      {data.length ? (
        <div>
          <div className="max-md:container border text-black max-w-[700px] mt-10 max-sm:mt-2 m-auto rounded-3xl background-dark p-10 max-sm:p-5">
            <h1 className=" text-2xl max-sm:text-base font-medium">
              Summary
            </h1>
            <h3 className=" max-sm:text-xs">{`${data.length} ${data.length > 1 ? "Tasks" : "Task"}`}</h3>

            <div className="flex flex-col w-[60%] max-sm:w-[100%] mt-3 max-sm:mt-5 overflow-hidden">
              <div className="flex justify-between items-center">
                <p>
                  <span className={` ${handleTasksStatus() === "No tasks completed" ? "text-red-700" : handleTasksStatus() === "Less than half tasks completed" ? "text-red-700" : "text-lime-700"} font-semibold`}> Progress</span>
                </p>
                <p className={` ${handleTasksStatus() === "No tasks completed" ? "text-red-700" : handleTasksStatus() === "Less than half tasks completed" ? "text-red-700" : "text-lime-700"} font-semibold`}>{completedTask()}%</p>
              </div>
              <div className="mt-3" role="progressbar" aria-valuenow={completedTask()} aria-valuemin="0" aria-valuemax="100" style={{ '--value': `${completedTask()}`, position: 'relative', alignSelf: 'center' }}>
              </div>
            </div>

          </div>

          <div className="max-md:container max-w-[700px] m-auto mt-7 max-sm:mt-5 mb-7 max-sm:mb-5 relative">
            <input
              type="text"
              placeholder="Search for task..."
              value={search}
              onChange={handleSearch}
              className="w-full h-14 max-sm:h-12 rounded-xl pl-11 placeholder:text-sm outline-none"
            />
            <IoMdSearch className="absolute top-[50%] left-3 -translate-y-[50%] text-blue-600 text-2xl max-sm:text-xl" />
          </div>

          <div className="max-md:container max-w-[700px] m-auto flex flex-col gap-4 max-sm:gap-3 pb-5">
            {searchResults.map((val, index) => (
              <Todo
                key={index}
                i={index}
                val={val}
                data={data}
                setData={setData}
                setEdit={setEdit}
                setDeleteNotificationTitle={setDeleteNotificationTitle}
                setDeleteNotification={setDeleteNotification}
                setTaskDetails={setTaskDetails}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1 className=" w-full text-center text-2xl max-md:text-2xl max-sm:text-xl text-black font-bold absolute bottom-[50%] left-[50%] -translate-x-[50%]">
          You don't have any tasks
        </h1>
      )}
    </>
  );

};

export default DisplayTodos;
