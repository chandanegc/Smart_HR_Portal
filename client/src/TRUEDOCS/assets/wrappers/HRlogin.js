import styled from "styled-components";

const Wrapper = styled.div`
   .login-page{
    background-position:center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    overflow: hidden;
   }
  .login-container {
    width: 350px;
    background-color: white;
    margin: 10% auto;
    padding: 30px 50px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    i {
      color: gray;
      margin-left: 4%;
    }
    h3{
      color: black;
      margin-top : 15px;
      padding-bottom: 5px;
    }
    p{
      color: #e95615;
    }
    .logo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .S9gUrf-YoZ4jf{
    display :flex;
    justify-content:center;
    margin : 2%;
    }
    .avatar img { 
      margin: 5% 0;
      width: 300px;
      border-radius : 8px;
    }
    .discription{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 15px;
        margin-bottom: 5px;
    }
    button {
      width: 100%;
      margin: 10px;
      margin-bottom: 30px;
      padding: 10px;
      background-color: #ff5f2d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #df4930;
}
}
`;

export default Wrapper;
