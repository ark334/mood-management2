import React from 'react';
import Modal from "react-bootstrap/Modal"
import "../css/styles.css";

const MoodStats = ({ happy, angry, sad, close }) => {

    const handleBarHappy = () => {
        if (happy === 0) return "bar bar-none";
        if (happy < angry && happy < sad) return "bar bar-sm";
        if (happy === angry || happy === sad) return "bar bar-md";
        else return "bar bar-lg";
    }
    const handleBarAngry = () => {
        if (angry === 0) return "bar bar-none";                     // Bar representations depending on current percentages (not counting editions)
        if (angry < happy && angry < sad) return "bar bar-sm";
        if (happy === angry || angry === sad) return "bar bar-md";
        else return "bar bar-lg";
    }
    const handleBarSad = () => {
        if (sad === 0) return "bar bar-none";
        if (sad < angry && sad < happy) return "bar bar-sm";
        if (sad === angry || happy === sad) return "bar bar-md";
        else return "bar bar-lg";
    }

    return (
        <>
            {/* Stats modal render */}
            <Modal show={true} onHide={close} centered>
                <Modal.Header closeButton>
                    <Modal.Title>My mood statistics</Modal.Title><br />
                </Modal.Header>
                <Modal.Body><div style={{ backgroundColor: "lightgreen" }} className={handleBarHappy()}>Happy: {happy}%</div>
                    <div style={{ backgroundColor: "pink" }} className={handleBarAngry()}>Angry: {angry}%</div>
                    <div style={{ backgroundColor: "cyan" }} className={handleBarSad()}>Sad: {sad}%</div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MoodStats;