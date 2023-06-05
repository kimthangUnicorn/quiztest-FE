import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import "../asset/authen.css";
import axios from "axios"
function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState("");
  const [authen, setAuthen] = useState(true);
  const [errors, setErrors] = useState("");

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("oke");
    var flag = true;
    let error = {};
    if (authen == true) {
      if (
        inputs.account === undefined ||
        inputs.account === "" ||
        inputs.account == null
      ) {
        flag = false;
        error.account = "Bạn chưa nhập tài khoản";
      }
      if (
        inputs.password === undefined ||
        inputs.password === "" ||
        inputs.password == null
      ) {
        flag = false;
        error.password = "Bạn chưa nhập mật khẩu";
      }
    } else {
      if (
        inputs.account === undefined ||
        inputs.account === "" ||
        inputs.account == null
      ) {
        flag = false;
        error.account = "Bạn chưa nhập tài khoản";
      }
      if (
        inputs.password === undefined ||
        inputs.password === "" ||
        inputs.password == null
      ) {
        flag = false;
        error.password = "Bạn chưa nhập mật khẩu";
      }
      if (
        inputs.repassword === undefined ||
        inputs.repassword === "" ||
        inputs.repassword == null
      ) {
        flag = false;
        error.password = "Bạn chưa nhập lại mật khẩu";
      }
      if (inputs.password !== inputs.repassword) {
        flag = false;
        error.password = "Mật khẩu không trùng khớp";
      }
    }

    if (!flag) {
      setErrors(error);
    } else {
      let user = {
        account: inputs.account,
        password: inputs.password,
      };
      let user2 = {
        account: inputs.account,
        password: inputs.password,
        role : "guest"
      };
      console.log(typeof(user));
      if(authen == true){
        console.log("login");
        axios.post("http://localhost:8085/api/login",user)
        .then((res)=>{
          console.log(res);
          if(res.status == 200){
            alert("Đăng nhập thành công")
          }
          if(res.data.user.role == "guest"){
            navigate("/test")
          }else if(res.data.user.role == "admin"){
            navigate("/newtest")
          }
        })
      }else if(authen == false){
        console.log("register");
        axios.post("http://localhost:8085/api/register",user2)
        .then((res)=>{
          if(res.data.errMessage == "OK"){
            setAuthen(true)
          }
        })
      }
      
    }
  };
  return (
    <>
      {authen == true ? (
        <>
          <div className="container">
            <form className="form-authen" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tài khoản"
                name="account"
                onChange={handleInput}
              ></input>
              <p style={{ color: "red" }}>{errors.account}</p>

              <input
                type="text"
                placeholder="Mật khẩu"
                name="password"
                onChange={handleInput}
              ></input>
              <p style={{ color: "red" }}>{errors.password}</p>

              <button className="field_login" type="submit">Login</button>
              <div className="form-authen_sub">
                <button
                  className="field_register"
                  onClick={() => setAuthen(false)}
                >
                  Create new Account
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <form className="form-authen" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tài khoản"
                name="account"
                onChange={handleInput}
              ></input>
              <p style={{ color: "red" }}>{errors.account}</p>

              <input
                type="text"
                placeholder="Mật khẩu"
                name="password"
                onChange={handleInput}
              ></input>
              <p style={{ color: "red" }}>{errors.password}</p>

              <input
                type="text"
                placeholder="Nhập mật khẩu"
                name="repassword"
                onChange={handleInput}
              ></input>
              <p style={{ color: "red" }}>{errors.repassword}</p>

              <button className="field_login" type="submit">Register</button>
              <div className="form-authen_sub">
                <button
                  className="field_register"
                  onClick={() => setAuthen(true)}
                >
                  Log in to your account
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
