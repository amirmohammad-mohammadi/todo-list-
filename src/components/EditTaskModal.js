import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
} from "@material-ui/core";

const useStyels = makeStyles(() => {
  return {
    paper: {
      width: "600px",
    },
  };
});

function EditTaskModal({
  open,
  handleClose,
  title,
  desc,
  kpi,
  id,
  severity,
  setTasks,
  setAddTaskModal,
  makeTaskDone,
}) {
  const classes = useStyels();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.paper }}
    >
      <DialogContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              color:
                severity === "High"
                  ? "red"
                  : severity === "Medium"
                  ? "yellowgreen"
                  : "green",
              display: "flex",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "9999px",
                background:
                  severity === "High"
                    ? "red"
                    : severity === "Medium"
                    ? "yellowgreen"
                    : "green",
                marginRight: "4px",
              }}
            />
            <p>{severity}</p>
          </div>
          <p>{title}</p>
          <p>{desc}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexGrow: "1",
          }}
        >
          <Button
            variant="contained"
            style={{ background: "orange" }}
            onClick={() => {
              setAddTaskModal({ title, desc, kpi, id, severity });
              setTimeout(() => {
                handleClose();
              }, 2000);
            }}
          >
            Edit task
          </Button>
          <Button
            variant="contained"
            style={{ background: "green" }}
            onClick={() => {
              // Make task done
              makeTaskDone();
              handleClose();
            }}
          >
            Done Task
          </Button>
          <Button
            variant="contained"
            style={{ background: "red" }}
            onClick={() => {
              setTasks((prev) => [...prev.filter((el) => el.id !== id)]);
              handleClose();
            }}
          >
            Delete Task
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default EditTaskModal;
