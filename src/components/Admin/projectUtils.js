export const projectStatuses = [
  "new",
  "reviewing",
  "quoted",
  "approved",
  "production",
  "completed",
];

export const projectStatusLabels = {
  new: "New",
  reviewing: "Reviewing",
  quoted: "Quoted",
  approved: "Approved",
  production: "In Production",
  completed: "Completed",
};

export const nextProjectStatus = {
  new: "reviewing",
  reviewing: "quoted",
  quoted: "approved",
  approved: "production",
  production: "completed",
};


export const getDueDateMessage = (project) => {
  if (!project.due_date || project.status === "completed") {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${project.due_date}T00:00:00`);

  const differenceInDays = Math.round(
    (dueDate - today) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays < 0) {
    const daysOverdue = Math.abs(differenceInDays);

    return `${daysOverdue} ${
      daysOverdue === 1 ? "day" : "days"
    } overdue`;
  }

  if (differenceInDays === 0) {
    return "Due today";
  }

  if (differenceInDays === 1) {
    return "1 day left";
  }

  return `${differenceInDays} days left`;
};

export const getDueDateStatus = (project) => {
  if (!project.due_date || project.status === "completed") {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${project.due_date}T00:00:00`);

  const differenceInDays = Math.ceil(
    (dueDate - today) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays < 0) {
    return "overdue";
  }

  if (differenceInDays <= 3) {
    return "due-soon";
  }

  return null;
};