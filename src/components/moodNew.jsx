import React, { useState, useRef, useEffect } from 'react';
import "../css/styles.css";
import send from "../img/send.png"
import MoodPost from './moodPost';

const MoodNew = () => {

    const [postList, setPostList] = useState([]); //Setting new post State
    const [status, setStatus] = useState({ id: -1, desc: "", mood: "" }); //Setting post data State with object with the 2 keys (description and mood)
    const [data, setData] = useState(""); // Make json data posted in backend available to render
    // const [statMsg, setStatMsg] = useState(""); //Setting error msg State

    useEffect(() => {
        setPostList(JSON.parse(window.localStorage.getItem("postList")));
    }, []); // Show previous data even when page reloads

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const weekDay = week[date.getDay()]; // Show month, and day
    const numberDay = date.getDate();
    const month2 = month[date.getMonth()];
    const fullDate = `${month2}, ${weekDay} - ${numberDay}`

    const refMood1 = useRef();
    const refMood2 = useRef();
    const refMood3 = useRef();

    const handleDesc = (e) => { // Adding description field only
        setStatus({ ...status, desc: e.target.value });
    }

    const handleMood = (e) => { // Adding mood status and id
        setStatus({ ...status, mood: e.target.value, id: status.id + 1 });
    }

    const handleSubmit = async (e) => { // Submit button
        e.preventDefault();
        setPostList(postList => [...postList, status]); //Prepare new post to render dinamically using postList as an array
        setStatus({ ...status, desc: "" }); // Controlled form input, to reset field when form is submitted
        refMood1.current.checked = false;
        refMood2.current.checked = false; //Resetting form fields when send
        refMood3.current.checked = false;
        const result = await fetch("http://localhost:3333/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(status)
        })
        const data = await result.json(); // Store data in Express backend
        setData(data);
    }

    useEffect(() => {
        window.localStorage.setItem("postList", JSON.stringify(postList));
    }, [postList]); // Save data in page reloads

    // App layout with form
    return (<main className='col-md-6 col-lg-5 col-xl-3 col-12'>
        <section className='new mb-4'>
            <p className='title'>in-manas Team</p>
            <p className='date'>{fullDate}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description" className="desc">DESCRIPTION</label><br />
                <textarea onChange={handleDesc}
                    className="input"
                    type="text"
                    maxLength={100}
                    value={status.desc}
                    name="desc"
                    required // required field
                    placeholder="Write how you feel today..." />
                <br />
                <div className="text-center">
                    <input onClick={handleMood} type="radio" ref={refMood1} id="happy" required name="mood" value="Happy" />
                    <label className='m-1 mt-3' htmlFor="happy">I'm happy</label><br />
                    <input onClick={handleMood} type="radio" ref={refMood2} id="angry" required name="mood" value="Angry" />
                    <label className='m-1' htmlFor="angry">I'm angry</label><br />
                    <input onClick={handleMood} type="radio" ref={refMood3} id="sad" required name="mood" value="Sad" />
                    <label className='mb-4 m-1' htmlFor="sad">I'm sad</label>
                </div>
                <div className="row justify-content-end">
                    <input className='col-2' type="image" src={send} alt="submit" style={{ cursor: "pointer" }} />
                </div>
            </form>
        </section>
        {/* Error stats message */}
        {/* <p className="error text-center">{statMsg}</p> */}
        {/* Render based on number of post */}
        {postList.map((p, i) => <MoodPost post={data} postlist={postList} day={fullDate} id={p.id} key={i} desc={p.desc} mood={p.mood} />)}
    </main>
    )
}

export default MoodNew;