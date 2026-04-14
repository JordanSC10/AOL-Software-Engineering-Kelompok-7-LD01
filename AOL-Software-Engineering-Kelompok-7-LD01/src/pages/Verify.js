import { useState } from "react";
import API from "../api/axios";

export default function Verify() {
  const [file, setFile] = useState();

  const submit = async () => {
    const form = new FormData();
    form.append("ktp", file);

    await API.post("/verify", form);
    alert("Uploaded!");
  };

  return (
    <div>
      <h2>Upload KTP</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}