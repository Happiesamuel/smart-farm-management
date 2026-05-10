import TaskActivity from "@/components/worker/task/TaskActivity";
import TaskCreation from "@/components/worker/task/TaskCreation";
import TaskDescription from "@/components/worker/task/TaskDescription";
import TaskIdHeader from "@/components/worker/task/TaskIdHeader";
import TaskInfo from "@/components/worker/task/TaskInfo";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 ">
      <TaskIdHeader />
      <TaskCreation />
      <div className="grid grid-cols-2 gap-4 mt-4 ">
        <TaskActivity />
        <TaskInfo />
      </div>
      <TaskDescription />
    </div>
  );
}
