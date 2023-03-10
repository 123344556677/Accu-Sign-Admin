import React, {useState} from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input } from 'reactstrap';
import FileBase64 from "react-file-base64";
import { addDocument } from 'Api/api';
import Swal from "sweetalert2";

const DocumentModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[title,setTitle]=useState('');
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const [documentPic, setDocumentPic] = useState()
    const handleDocumentPic = (e) => {
        setDocumentPic(e.selectedFile.base64)
 }

 const documentValues={
     documentPic:documentPic,
     title:title
 }
    const handleDocument = async () => {
        const { documentPic, title }=documentValues;
        if (documentPic &&   title){
        await addDocument(documentValues)
            .then((res) => {
                if (res.data.message === "document created") {
                    handleClose();
                    Swal.fire({
                        position: "center",
                        icon: "succcess",
                        text: "Document Uploaded",
                        color: "black",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    window.location.reload();
                }
                else {
                    handleClose();
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        text: "Error in uploading document",
                        color: "black",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    window.location.reload();
                }
            })
        }
        else{
            Swal.fire({
                position: "center",
                icon: "warninig",
                text: "Please complete all the fields",
                color: "black",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }

  return (
      <div>
      { role.role==="admin"&&
          <Button color="secondary" size="lg" className="mt-1 mr-3" style={{ float: "right" }}

              onClick={handleShow}>UPLOAD</Button>
      }

          <Modal show={show} onHide={handleClose}>
              <div className="modal-header px-4">
                  <h2 className="modal-title h4 text-dark">Upload Picture</h2>
                  <button
                      type="button"
                      className="bg-white border-0"
                      onClick={handleClose}
                  >

                  </button>
              </div>
              <Modal.Body className="px-4">
                  <Form>
                      <div className="">
                          <FileBase64
                              type="file"

                              onDone={(base64) => handleDocumentPic({ selectedFile: base64 })}


                          />
                      </div>
                      <Input type="text" name="title" className='mt-3'
                          onChange={(e)=>setTitle(e.target.value)} id="" placeholder="Document title" />
                      
                  </Form>
              </Modal.Body>
              <Modal.Footer className="justify-content-between px-4">
                  <Button className="" color="dark" type="button"
                      onClick={handleDocument}>
                      Upload
                  </Button>
                  <button
                      className="btn btn-danger"
                      variant="danger"
                      onClick={handleClose}
                  >
                      Close
                  </button>
              </Modal.Footer>
          </Modal>

      </div>
  )
}

export default DocumentModal