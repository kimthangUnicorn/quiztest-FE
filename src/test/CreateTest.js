import "../asset/newtest.css";
import { Link } from "react-router-dom";
function CreateTest() {
  return (
    <>
      <div className="formTest">
        <div className="create">
          <Link to="/test">
            <button className="initialization">Start</button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default CreateTest;
