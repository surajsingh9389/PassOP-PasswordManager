import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
  const ref = useRef();
  const hidePassword = useRef();
  const [save, setsave] = useState({ Url: "", Password: "", Username: "" });
  const [passwordsArray, setpasswordsArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordsArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/hide.png")) {
      ref.current.src = "/view.png";
      hidePassword.current.type = "text";
    } else {
      ref.current.src = "/hide.png";
      hidePassword.current.type = "password";
    }
  };

  const savePassword = () => {
    if (
      save.Url.length > 4 &&
      save.Password.length > 7 &&
      save.Username.length > 4
    ) {
      const updatedPasswords = [...passwordsArray, { ...save, id: uuidv4() }];
      setpasswordsArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setsave({ Url: "", Password: "", Username: "" });

      toast("Password saved!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (save.Url.length < 5) {
      toast("Invalid Url!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (save.Password.length < 8) {
      toast("Password must be 8 charactor long!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (save.Username.length < 5) {
      toast("Username must be 5 charactor long!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = (id) => {
    let con = confirm("Do you really want to delete this password?");
    if (con) {
      setpasswordsArray(passwordsArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordsArray.filter((item) => item.id !== id))
      );
    }

    toast("Password deleted!", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = (id) => {
    setsave(passwordsArray.filter((item) => item.id === id)[0]);
    setpasswordsArray(passwordsArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setsave({ ...save, [e.target.name]: e.target.value });
    if (hidePassword.current.type.includes("password")) {
      ref.current.src = "/hide.png";
    } else {
      ref.current.src = "/view.png";
    }
  };

  const copyText = (text) => {
    toast("coppied to Clipboard!", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const allClear = () => {
    let c = confirm("Do you want to clear all the data?");
    if (c) {
      setpasswordsArray([]);
      localStorage.setItem("passwords", JSON.stringify([]));
    }
  };

  return (
    <>
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />

  <div className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 flex flex-col items-center gap-6">
    {/* Logo / Title */}
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-blue-950 rounded-full text-center py-2">
      <h1 className="text-white text-2xl sm:text-3xl font-bold">
        <span>&lt;</span> Pass <span className="text-blue-400">Op/&gt;</span>
      </h1>
    </div>

    {/* Input Form */}
    <div className="w-full max-w-md flex flex-col gap-4">
      <input
        name="Url"
        type="text"
        placeholder="Enter URL"
        value={save.Url}
        onChange={handleChange}
        className="border border-blue-400 w-full rounded-full px-4 py-2 outline-blue-600"
      />
      <div className="flex flex-wrap sm:flex-nowrap gap-4">
        <input
          name="Username"
          type="text"
          placeholder="Username"
          value={save.Username}
          onChange={handleChange}
          className="border border-blue-400 flex-1 rounded-full px-4 py-2 outline-blue-600"
        />
        <div className="relative flex-1 min-w-[150px]">
          <input
            ref={hidePassword}
            name="Password"
            type="password"
            placeholder="Password"
            value={save.Password}
            onChange={handleChange}
            className="border border-blue-400 w-full rounded-full px-4 py-2 outline-blue-600"
          />
          <span className="absolute inset-y-0 right-2 flex items-center" onClick={showPassword}>
            <img
              ref={ref}
              className="h-6 w-6 cursor-pointer"
              src="/hide.png"
              alt="toggle"
            />
          </span>
        </div>
      </div>
      <button
        onClick={savePassword}
        className="w-full bg-blue-300 hover:bg-blue-400 rounded-full px-4 py-2 text-lg font-semibold text-white flex justify-center items-center gap-2 transition"
      >
        <lord-icon src="https://cdn.lordicon.com/tsrgicte.json" trigger="click" />
        <span>Save</span>
      </button>
    </div>

    {/* Password List */}
    <div className="w-full max-w-3xl mt-6 bg-blue-200 border border-blue-400 rounded-xl p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-600 pb-2">
        <h2 className="text-lg font-bold mb-2 sm:mb-0">&lt;&gt; Your Passwords</h2>
        <button
          onClick={allClear}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full px-4 py-1 transition"
        >
          Clear all
        </button>
      </div>

      {passwordsArray.length === 0 ? (
        <div className="mt-4 text-center text-gray-500 font-semibold">
          No passwords
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full bg-blue-200 rounded-lg">
            <thead className="bg-blue-400">
              <tr>
                <th className="px-3 py-2 text-left">URL</th>
                <th className="px-3 py-2 text-left">Username</th>
                <th className="px-3 py-2 text-left">Password</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordsArray.map((data, idx) => (
                <tr key={idx} className="border-b border-slate-400">
                  {['Url', 'Username', 'Password'].map((key) => (
                    <td key={key} className="px-3 py-2">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => copyText(data[key])}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/ueoydrft.json"
                          trigger="click"
                          stroke="bold"
                          style={{ width: '20px', height: '20px', backgroundColor: 'gray', borderRadius: '100%' }}
                        />
                        {key === 'Url' ? (
                          <a href={data[key]} target="_blank" rel="noopener noreferrer" className="truncate max-w-[150px] sm:max-w-xs md:max-w-sm">
                            {data[key]}
                          </a>
                        ) : (
                          <span className="truncate max-w-[150px] sm:max-w-xs md:max-w-sm">
                            {data[key]}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-4">
                      <button onClick={() => deletePassword(data.id)} className="p-1">
                        <lord-icon src="https://cdn.lordicon.com/hwjcdycb.json" trigger="click" stroke="bold" style={{ width: '22px', height: '22px' }} />
                      </button>
                      <button onClick={() => editPassword(data.id)} className="p-1">
                        <lord-icon src="https://cdn.lordicon.com/fikcyfpp.json" trigger="click" stroke="bold" colors="primary:#121331,secondary:#000000" style={{ width: '22px', height: '22px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</>
  );
};

export default Main;
