// Import alert to react-bootstrap


const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");  
const clearNotify = () => {
  setSuccessMessage("");
  setErrorMessage("")
}




{successMessage !== "" ? ( <Alert key={3} variant="success">Server response: {successMessage}</Alert>) : (<></>)}
{errorMessage !== "" ? ( <Alert key={3} variant="danger">Server response: {errorMessage}</Alert>) : (<></>)}



// .then((res) => {
//     if (res.status !== 201) {
//       return Promise.reject("Bad request sent to server!");
//     }
//     return res.json();
//   })
//   .then(data => setSuccessMessage(data.server_response))
//   .catch((err) => {
//     setErrorMessage(err);
//   });



// .then((res) => {
// if (res.status !== 200) {
//     return Promise.reject("Bad request sent to server!");
// }
// return res.json();
// })
// .then(data => setSuccessMessage(data.server_response))
// .catch((err) => {
// setErrorMessage(err);
// });