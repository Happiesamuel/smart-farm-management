import CreateTaskForm from "@/components/farm/tasks/CreateTaskForm";
import TaskPriorityGuide from "@/components/farm/tasks/TaskPriorityGuide";
import { FaRegCalendarCheck } from "react-icons/fa";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 ">
      <div>
        <div className="text-xl text-dark font-semibold pb-3">Add Task</div>
        <div className={`flex items-center  gap-4`}>
          <div
            className={` bg-[#fff1dd] text-[#de852c] size-12 rounded-xl items-center justify-center flex `}
          >
            <FaRegCalendarCheck className="text-2xl" />
          </div>
          <p className="text-sm text-dark/80 font-medium">
            Create a new task for your farm
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:gap-3 lg:gap-0 grid-cols-1 lg:grid-cols-[1fr_0.5fr] xl:grid-cols-[1fr_0.4fr]">
        <CreateTaskForm />
        <TaskPriorityGuide />
      </div>
    </div>
  );
}
