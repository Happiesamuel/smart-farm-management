import NotBoxes from "@/components/manager-settings/notificaations/NotBoxes";

export default function page() {
  const arrNot = [
    {
      name: "Email Notifications",
      text: "Recieve notifications via email",
      switch: true,
    },
    {
      name: "SMS Notifications",
      text: "Recieve notifications via sms",
      switch: true,
    },
    {
      name: "In-App Notifications",
      text: "Recieve notifications in the app",
      switch: true,
    },
  ];
  const arrAlert = [
    {
      name: "Task Reminders",
      text: "Get reminded about pending tasks",
      switch: true,
    },
    {
      name: "Weather Alerts",
      text: "Recieve upcoming weather alerts",
      switch: true,
    },
    {
      name: "Irrigation Alerts",
      text: "Get irrigation reminders",
      switch: true,
    },
    {
      name: "Harvest Alerts",
      text: "Get alerts for harvest readiness",
      switch: true,
    },
    {
      name: "Low Stock Alerts",
      text: "Get alerst for low inventory",
      switch: true,
    },
  ];
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Notifications</h6>
          <p className="text-dark/80 text-sm">
            Configure how to recieve notifications and alerts
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <NotBoxes arr={arrNot} header="Notification Channels" />
        <NotBoxes arr={arrAlert} header="Alert Preferences" />
      </div>
    </div>
  );
}
