import { Button } from "@material-ui/core";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import DoneTasksModal from "./DoneTasksModal";
import EditTaskModal from "./EditTaskModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState();
  const [showDoneTasksModal, setShowDoneTasksModal] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* <h1>Hello World</h1> */}

      {tasks.length === 0 && (
        <Button
          variant="contained"
          style={{ background: "orange", marginBottom: "16px" }}
          onClick={() => setAddTaskModal(true)}
        >
          Create Your First Task ;{")"}
        </Button>
      )}

      {tasks.length !== 0 && (
        <div
          style={{
            padding: "1rem",
            width: "70%",
            border: "2px solid black",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Button
              variant="contained"
              style={{ background: "lightblue", marginBottom: "16px" }}
              onClick={() => {
                setShowDoneTasksModal(true);
              }}
            >
              View done tasks
            </Button>
          </div>

          <DragDropContext>
            <Droppable droppableId="characters">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                    ?.filter((task) => task.status === "not-done")
                    ?.map((task, i) => {
                      console.log("task.id is", task.id);
                      return (
                        <Draggable key={task.id} draggableId={task.id}>
                          {(provided) => (
                            <div
                              // key={i}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              style={{
                                padding: "1rem",
                                border: "2px solid black",
                                borderRadius: "10px",
                                marginBottom: "16px",
                                // cursor: "pointer",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditTaskModal(task);
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginBottom: "8px",
                                }}
                              >
                                <p>{task?.title}</p>
                                <div
                                  style={{
                                    color:
                                      task.severity === "High"
                                        ? "red"
                                        : task.severity === "Medium"
                                        ? "yellowgreen"
                                        : "green",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      borderRadius: "9999px",
                                      background:
                                        task.severity === "High"
                                          ? "red"
                                          : task.severity === "Medium"
                                          ? "yellowgreen"
                                          : "green",
                                      marginRight: "4px",
                                    }}
                                  />
                                  <p>{task.severity}</p>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <p style={{ color: "#e4e4e4" }}>{task?.desc}</p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    style={{ background: "red" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setTasks((prev) => [
                                        ...prev.filter((t) => t.id !== task.id),
                                      ]);
                                    }}
                                  >
                                    Delete task
                                  </Button>
                                  <Button
                                    variant="contained"
                                    style={{
                                      background: "orange",
                                      margin: "0 1rem",
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setTasks((prev) => [
                                        ...prev.filter((t) => t.id !== task.id),
                                        {
                                          title: task.title,
                                          desc: task.desc,
                                          kpi: task.kpi,
                                          id: task.id,
                                          severity: task.severity,
                                          status: "done",
                                        },
                                      ]);
                                    }}
                                  >
                                    Done Task
                                  </Button>

                                  <Button
                                    variant="contained"
                                    style={{ background: "green" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setAddTaskModal({
                                        title: task.title,
                                        desc: task.desc,
                                        kpi: task.kpi,
                                        id: task.id,
                                        severity: task.severity,
                                      });
                                    }}
                                  >
                                    Edit task
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                background: "brown",
                color: "white",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "60px",
                fontSize: "24px",
                cursor: "pointer",
              }}
              onClick={() => setAddTaskModal(true)}
            >
              +
            </div>
          </div>
        </div>
      )}

      {!!addTaskModal && (
        <AddTaskModal
          open={addTaskModal}
          handleClose={() => setAddTaskModal(false)}
          setTasks={setTasks}
        />
      )}

      {!!editTaskModal && (
        <EditTaskModal
          open={editTaskModal}
          handleClose={() => setEditTaskModal()}
          setTasks={setTasks}
          title={editTaskModal?.title}
          desc={editTaskModal?.desc}
          kpi={editTaskModal?.kpi}
          id={editTaskModal?.id}
          severity={editTaskModal?.severity}
          setAddTaskModal={setAddTaskModal}
          makeTaskDone={() => {
            setTasks((prev) => [
              ...prev.filter((t) => t.id !== editTaskModal.id),
              {
                title: editTaskModal.title,
                desc: editTaskModal.desc,
                kpi: editTaskModal.kpi,
                id: editTaskModal.id,
                severity: editTaskModal.severity,
                status: "done",
              },
            ]);
          }}
        />
      )}

      {!!showDoneTasksModal && (
        <DoneTasksModal
          open={showDoneTasksModal}
          handleClose={() => setShowDoneTasksModal(false)}
          doneTasks={tasks.filter((task) => task.status === "done")}
        />
      )}
    </div>
  );
}

export default Tasks;
