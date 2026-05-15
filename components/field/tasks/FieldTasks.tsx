import TaskFilter from "@/components/farm/tasks/TaskFilter";
import FieldTaskTable from "./FieldTaskTable";

export default function FieldTasks() {
  return (
    <div className="pt-4">
      <TaskFilter />
      <FieldTaskTable />
    </div>
  );
}
