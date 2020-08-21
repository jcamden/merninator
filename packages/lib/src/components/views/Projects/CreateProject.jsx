import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ProjectContext from "../../context/project/projectContext";
import Message from "../utils/Message";
import ProgressBar from "../utils/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateProject = ({ setNewProject }) => {
  const projectContext = useContext(ProjectContext);
  const { addProjectToDB, addProjectToState } = projectContext;

  const [project, setProject] = useState({
    name: "",
    pdfName: "chews a file",
    pageString: "",
  });
  const [file, setFile] = useState("");
  const [message, setMessage] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [created, setCreated] = useState(false);
  const [hovered, setHovered] = useState(false);

  const onChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setProject({ ...project, pdfName: e.target.files[0].name });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await addProjectToDB(project);
    const url = `http://localhost:5000/api/uploads/${data._id}`;
    const formData = new FormData();
    // gonna be passed to upload backend as 'file':
    formData.append("file", file);
    try {
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // progress percentage
        onUploadProgress: (progressEvent) => {
          // console.log(progressEvent.loaded + "" + progressEvent.total);
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          if (progressEvent.loaded / progressEvent.total === 1) {
            addProjectToState(data);
            setMessage({
              text: "file chewed",
              type: "success",
              dismissable: false,
            });
          }
        },
      });
    } catch (err) {
      //this is largely a backup to the required attribute of the inputs, but also server biznas

      if (err.response) {
        if (err.response.status === 500) {
          setMessage({
            text: "There was a problem with the server.",
            type: "danger",
            dismissable: false,
          });
        } else if (err.response) {
          setMessage({
            text: err.response.data.msg,
            type: "danger",
            dismissable: false,
          });
        } else {
          setMessage({
            text: "An error occurred, the type of which is quite unknown.",
            type: "danger",
            dismissable: false,
          });
        }
      } else {
        console.log(err);
      }
    }

    setCreated(true);
  };

  return (
    <div
      className="position-absolute d-flex justify-content-between align-items-center"
      style={{
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 49, 194, .5)",
      }}
    >
      <div></div>
      <div
        className="shadow-lg p-5 mb-5 bg-white rounded"
        style={{
          width: "30rem",
        }}
      >
        <h4
          style={{
            cursor: hovered && "pointer",
          }}
          className={`text-right mt-n4 mr-n4 ${
            hovered ? "text-danger" : "text-secondary"
          }`}
          onClick={() => {
            setUploadPercentage(0);
            setNewProject(false);
          }}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        >
          <FontAwesomeIcon icon="times-circle" />
        </h4>
        <form
          onSubmit={
            created
              ? () => {
                  setUploadPercentage(0);
                  setNewProject(false);
                }
              : onSubmit
          }
        >
          <h2
            className="display-r text-center mb-4"
            style={{ fontFamily: "Lobster" }}
          >
            Create Project
          </h2>
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Title:
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Plight of the Graduate"
              name="name"
              onChange={onChange}
              required
            ></input>
          </div>
          <h5 className="text-center mb-4">
            <FontAwesomeIcon icon="file-pdf" className="text-danger" /> Upload a
            PDF
          </h5>
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChangeFile}
              required
            />
            <label
              className={`custom-file-label ${
                project.pdfName === "chews a file" ? "text-muted" : "text-dark"
              }`}
              htmlFor="customFile"
            >
              {project.pdfName}
            </label>
          </div>
          <ProgressBar percentage={uploadPercentage} />
          {message.text && <Message msg={message} setMessage={setMessage} />}
          {created ? (
            <input
              type="submit"
              value="Finish"
              className="btn btn-primary btn-block mt-4"
            />
          ) : (
            <input
              type="submit"
              value="Create"
              className="btn btn-success btn-block mt-4"
            />
          )}
        </form>
      </div>
      <div></div>
    </div>
  );
};

CreateProject.propTypes = {
  setNewProject: PropTypes.func,
};

export default CreateProject;
