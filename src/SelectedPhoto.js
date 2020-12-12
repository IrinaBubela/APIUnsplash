import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const SelectedPhoto = (props) => {

    const [lgShow, setLgShow] = useState(false);

    return (
        <>
            <div className="card-item" key={props.pic.id} onClick={() => setLgShow(true)}>
                <a>
                    <img
                        className="card--image"
                        alt={props.pic.alt_description}
                        src={props.pic.urls.full}
                        width="50%"
                        height="50%"
                    />
                    <div id="hiding-div">
                        <img
                            id="user-icon"
                            alt={props.pic.alt_description}
                            src={props.pic.user.profile_image.small}
                        />
                        <p>{props.pic.user.name}</p>
                    </div>
                </a>
            </div>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img
                            id="user-icon"
                            alt={props.pic.alt_description}
                            src={props.pic.user.profile_image.small}
                        />
                        <p>{props.pic.user.name}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={props.pic.urls.regular} alt={props.pic.alt_description}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <p>
                        {props.pic.user.location}
                    </p>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SelectedPhoto;