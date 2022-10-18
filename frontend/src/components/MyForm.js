import React, {useState} from "react";
import axios from "axios";
function Quotes() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
function getQuote() {
    axios.get("http://localhost:8080/users",  { crossdomain: true }).then(response => {
      setText(response.data[0].first_name);
      setAuthor(response.data[0].last_name);
      console.log(response, "response");
    });
  }
return (
    <div>
      <button onClick={getQuote}>
        Generate Quote
      </button>
      <h1>{text}</h1>
      <h3>{"-" + author}</h3>
    </div>
  )
}
export default Quotes;
