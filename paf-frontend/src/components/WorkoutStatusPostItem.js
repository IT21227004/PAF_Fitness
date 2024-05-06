import React from "react";
import {Hashicon} from "@emeraldpay/hashicon-react";
import {Row} from "react-bootstrap";


function WorkoutStatusPostItem(props) {
    return (
        <div className="border shadow rounded-3 border-primary p-3 mt-3">
            <Row>
                <div className="d-flex align-items-center mb-3">
                    <div className="mx-3">
                        <Hashicon value={props.Id} size={50}/>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="fw-bold">{props.firstName + " " + props.lastName}</div>
                    </div>
                </div>
                <div className="mx-3">
                    <h3>My Workout Status</h3>
                    <div>
                        <p>{props.description}</p>
                        <h5>Distance Ran: {props.distance}</h5>
                        <p>Push Ups Count: {props.pushups}</p>
                        <p>Weight Lifted: {props.weight}</p>
                    </div>
                </div>
            </Row>
        </div>
    );
}

export default WorkoutStatusPostItem;
