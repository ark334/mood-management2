import React, { useState, useRef } from 'react';
import "../css/styles.css";
import send from "../img/send.png"
import MoodPost from './moodPost';

const MoodEdit = ({ desc, mood, postlist, id }) => {

    const [status, setStatus] = useState({ id, desc, mood }); // Set new data to render, with id the same as before, that can't (and shouldn't) be edited
    const [edited, setEdited] = useState(""); // Prepare edited post to be rendered

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const weekDay = week[date.getDay()]; // Show month, and day
    const numberDay = date.getDate();
    const month2 = month[date.getMonth()];
    const fullDate = `${month2}, ${weekDay} - ${numberDay}`

    const refEdit = useRef();
    const refInput = useRef();
    const refMood1 = useRef();
    const refMood2 = useRef();
    const refMood3 = useRef();

    const handleDesc = (e) => {  // Updating description field only
        setStatus({ ...status, desc: e.target.value })
    }

    const handleMood = (e) => { // Updating mood
        setStatus({ ...status, mood: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        refEdit.current.style.display = "none"; // Hide current window, to render post Window
        // Prepare new post to be rendered with new data
        setEdited(<MoodPost desc={status.desc} id={id} docEdited={true} mood={status.mood} day={fullDate} />)
    }

    return (<>
        <section ref={refEdit} className='edit mb-4'>
            <p className='title'>in-manas Team</p>
            <p className='date'>{fullDate}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description" className="desc">DESCRIPTION</label><br />
                <textarea onChange={handleDesc}
                    className="input"
                    type="text"
                    ref={refInput}
                    maxLength={100}
                    name="desc"
                    defaultValue={desc} // Show default previous value on edit
                    required // required field
                    placeholder="Write how you feel today..." />
                <br />
                <div className="text-center">
                    <input onClick={handleMood} type="radio" ref={refMood1} id="happy" required name="mood" defaultChecked={mood === "Happy" && true} value="Happy" />
                    <label className='m-1 mt-3' htmlFor="happy">I'm happy</label><br />
                    <input onClick={handleMood} type="radio" ref={refMood2} id="angry" required name="mood" defaultChecked={mood === "Angry" && true} value="Angry" />
                    <label className='m-1' htmlFor="angry">I'm angry</label><br />
                    <input onClick={handleMood} type="radio" ref={refMood3} id="sad" required name="mood" defaultChecked={mood === "Sad" && true} value="Sad" />
                    <label className='mb-4 m-1' htmlFor="sad">I'm sad</label>
                </div>
                <div className="row justify-content-end">
                    <input className='col-2' type="image" src={send} alt="submit" style={{ cursor: "pointer", marginRight: "20px" }} />
                </div>
            </form>
        </section>
        {edited}
    </>
    )
}

export default MoodEdit;