import React, { useState, useRef } from 'react';
import "../css/styles.css";
import pencil from "../img/lapiz.png"
import stats from "../img/stats.png"
import MoodEdit from './moodEdit';
import MoodStats from './moodStats';

const MoodPost = ({ desc, day, mood, postlist, id, docEdited }) => {

    const [edit, setEdit] = useState(""); // Prepare to render edit post window
    const [show, setShow] = useState(""); //Setting modal State

    const refPost = useRef();

    const handleClose = () => setShow(false); // Function to close stats modal

    const handleEdit = () => {
        refPost.current.style.display = "none"; // Exit this windows in order to display the edit window
        setEdit(<MoodEdit postlist={postlist} id={id} day={day} desc={desc} mood={mood} />); // Set the state to render the edit post window
    }

    const handleStats = () => { // Modal using stats array from line 11 with formulas to calculate 
        let totalCount = postlist.length;
        let happyCount = ((postlist.filter(e => e.mood === "Happy")).length / totalCount) * 100;
        happyCount = Math.round(happyCount);
        let angryCount = ((postlist.filter(e => e.mood === "Angry")).length / totalCount) * 100;
        angryCount = Math.round(angryCount);
        let sadCount = ((postlist.filter(e => e.mood === "Sad")).length / totalCount) * 100;
        sadCount = Math.round(sadCount);
        setShow(<MoodStats close={handleClose} // Passing prop to Modal component to close it
            happy={happyCount}
            angry={angryCount}
            sad={sadCount} />)
    }

    return (<>
        <section className="post" ref={refPost}>
            <div className="row">
                <p className='title col-6'>in-manas Team</p>
                <div className='text-end col'><img alt="edit" onClick={handleEdit} src={pencil} style={{ cursor: "pointer" }}></img></div>
            </div>
            <p className='date'>{`Posted on: ${day}`}</p>
            <div>
                <div className="text-center">
                    <p className="desc">DESCRIPTION</p>
                    <p className="descPost">{desc}</p>
                </div>
                <div className="mt-2 text-center">
                    <p className='desc'>MOOD:</p>
                    <p>{mood}</p>
                </div>
            </div>
        </section>
        {/* Show stats modal when clicked, not counting editions */}
        <img alt="stats" onClick={handleStats} className="stats" src={stats} />
        {/* Show edit post window when needed*/}
        {edit}
        {/* Render stats modal when clicked */}
        {show}
    </>);
}

export default MoodPost;