import '../../style/login.css';
import Form from './component/Form';
import RegContent from "./component/LoginContent";

export default function() {
    return (
        <>
        <div className="regsection">
          <div className="container">
            <RegContent />
            <Form />
          </div>
        </div>
      </>
    );
}