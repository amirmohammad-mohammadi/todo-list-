import { Dialog, DialogContent, makeStyles } from "@material-ui/core";

const useStyels = makeStyles(() => {
  return {
    paper: {
      width: "600px",
    },
  };
});

function DoneTasksModal({ open, handleClose, doneTasks }) {
  const classes = useStyels();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.paper }}
    >
      <DialogContent>
        <h2 style={{ textAlign: "center" }}>Done tasks list</h2>
        {doneTasks.length === 0 ? (
          <p>No tasks are done</p>
        ) : (
          doneTasks.map((task, i) => {
            return (
              <div
                key={i}
                style={{
                  padding: "1rem",
                  border: "2px solid black",
                  borderRadius: "10px",
                  marginBottom: "16px",
                  // cursor: "pointer",
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
                  }}
                >
                  <p style={{ color: "black" }}>{task?.desc}</p>
                </div>
              </div>
            );
          })
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DoneTasksModal;
