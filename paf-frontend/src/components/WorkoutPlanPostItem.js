import React from "react";
import {Hashicon} from "@emeraldpay/hashicon-react";
import {Row} from "react-bootstrap";


function WorkoutPlanPostItem(props) {
    return (
        <div className="border shadow rounded-3 border-primary p-3 mt-3">
            <Row>
                <div className="d-flex align-items-center mb-3">
                    <div className="mx-3">
                        <Hashicon value={props.userId} size={50}/>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="fw-bold">{props.firstName + " " + props.lastName}</div>
                    </div>
                </div>
                <div className="mx-3">
                    <h3>My Workout Plan</h3>
                    <div>
                        <p>routine: {props.routine}</p>
                        <p>exercise: {props.exercise}</p>
                        <p>sets: {props.sets}</p>
                        <p>repetitions: {props.repetitions}</p>
                    </div>
                </div>
            </Row>
        </div>
    );
}

export default WorkoutPlanPostItem;
