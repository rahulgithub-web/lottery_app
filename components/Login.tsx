import { useMetamask } from "@thirdweb-dev/react";
import React from "react";

const Login = () => {
  const connectWithMetamask = useMetamask();

  return (
    <div className="flex bg-[#091818] min-h-screen flex-col items-center justify-center mb-10">
      <div className="flex flex-col items-center mb-10">
        <img
          className="rounded-full h-56 w-56 mb-10"
          src="https://i.ibb.co/M5mJYPv/5df33d9d-4977-4a25-ba5a-abfe87d19db0.jpg"
        />
        <h1 className="text-6xl text-white font-bold">THE GYANI DRAW</h1>
        <h2 className="text-white">
          Get Started By logging in with your Metamask
        </h2>

        <button
          onClick={connectWithMetamask}
          className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold"
        >
          Login with Metamask
        </button>
      </div>
    </div>
  );
};

export default Login;
