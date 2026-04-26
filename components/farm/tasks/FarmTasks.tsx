import FarmTaskTable from "./FarmTaskTable";
import TaskFilter from "./TaskFilter";

export default function FarmTasks() {
  return (
    <div className="pt-4">
      <TaskFilter />
      <FarmTaskTable />
    </div>
  );
}
