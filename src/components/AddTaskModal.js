import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyels = makeStyles(() => {
  return {
    paper: {
      width: "600px",
    },
  };
});

function AddTaskModal({ open, handleClose, setTasks }) {
  const classes = useStyels();

  const [title, setTitle] = useState(open?.title || "");
  const [desc, setDesc] = useState(open?.desc || "");
  const [kpi, setKpi] = useState(open?.kpi || "");

  const [showTitleError, setShowTitleError] = useState(false);
  const [showDescError, setShowDescError] = useState(false);
  const [showKpiError, setShowKpiError] = useState(false);

  const [value, setValue] = useState(open?.severity || "Low");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function onSubmit() {
    if (title.length < 3) {
      return setShowTitleError(true);
    } else if (desc.length < 3) {
      return setShowDescError(true);
    } else if (kpi.length < 3) {
      return setShowKpiError(true);
    }

    if (!open?.id) {
      setTasks((prev) => [
        ...prev,
        {
          title,
          desc,
          kpi,
          id: Math.random(),
          severity: value,
          status: "not-done",
        },
      ]);
    } else {
      setTasks((prev) => [
        ...prev.filter((el) => el.id !== open.id),
        {
          title: title,
          desc: desc,
          kpi: kpi,
          id: open?.id,
          severity: value,
          status: "not-done",
        },
      ]);
    }
    handleClose();
  }

  useEffect(() => {
    setShowDescError(false);
    setShowKpiError(false);
    setShowTitleError(false);
  }, [title, desc, kpi]);

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
          }}
        >
          <TextField
            id="outlined-search"
            label="Task Title"
            type="search"
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ minLength: 3 }}
          />
          {showTitleError && (
            <div style={{ color: "red" }}>
              Title must be at least 3 characters
            </div>
          )}
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Task Description"
            style={{ width: "100%", padding: "16px" }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            inputProps={{ minLength: 3 }}
          />
          {showDescError && (
            <div style={{ color: "red" }}>
              Description must be at least 3 characters
            </div>
          )}

          <TextField
            id="outlined-search"
            label="Gifts and KPI for this task ;)"
            type="search"
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px", marginTop: "16px" }}
            value={kpi}
            onChange={(e) => setKpi(e.target.value)}
            inputProps={{ minLength: 3 }}
          />
          {showKpiError && (
            <div style={{ color: "red" }}>Must be at least 3 characters</div>
          )}

          <FormControl component="fieldset">
            {/* <FormLabel component="legend"></FormLabel> */}
            <RadioGroup
              //   aria-label="severity"
              name="severity"
              value={value}
              row
              onChange={handleChange}
            >
              <FormControlLabel value="Low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="Medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="High" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: "1",
          }}
        >
          <Button
            style={{ background: "orange", padding: "8px 32px" }}
            onClick={() => onSubmit()}
          >
            {!!open?.id ? "Edit the task" : "Add to tasks"}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default AddTaskModal;
