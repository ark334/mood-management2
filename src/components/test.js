import React, { useState } from "react";

const Test = () => {
  const [entryList, setEntryList] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntryList((entryList) => [...entryList, input]);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInput(e.target.value)}
          required
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
      <p>Entradas:</p>
      {entryList.map((e, i) => (
        <p>{e}</p>
      ))}
    </main>
  );
};

export default Test;
