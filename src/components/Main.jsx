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

      <div className="min-w-1/2 mx-auto mt-10 flex flex-col gap-3 items-center">
        <div className="w-50 bg-blue-950 rounded-full text-center">
          <div className="pb-2 text-white text-2xl font-bold">
            <span>&lt;</span>
            Pass
            <span className="text-blue-400 text-3xl">Op/&gt;</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <input
            name="Url"
            type="text"
            placeholder="Enter URL"
            value={save.Url}
            onChange={handleChange}
            className="border border-blue-400 w-full rounded-full px-3 py-1 outline-blue-600"
          />
          <div className="flex justify-between gap-10">
            <input
              name="Username"
              type="text"
              placeholder="Username"
              value={save.Username}
              onChange={handleChange}
              className="border border-blue-400 w-3/4 rounded-full px-3 py-1 outline-blue-600"
            />
            <div className="relative">
              <input
                ref={hidePassword}
                name="Password"
                type="password"
                placeholder="Password"
                value={save.Password}
                onChange={handleChange}
                className="border border-blue-400 rounded-full px-3 py-1 outline-blue-600"
              />
              <span className="absolute right-0" onClick={showPassword}>
                <img
                  ref={ref}
                  className="px-3 py-2 cursor-pointer"
                  width={40}
                  src="/hide.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="bg-blue-300 rounded-4xl px-4 py-1 hover:bg-blue-400 cursor-pointer flex justify-center items-center gap-2 mt-2 border border-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/tsrgicte.json"
              trigger="click"
            ></lord-icon>
            <span className="text-lg font font-semibold pb-1">save</span>
          </button>
        </div>

        <div className="mt-5 min-w-[700px] min-h-43 bg-blue-200 border border-blue-400 rounded-xl px-3 py-2 pb-4">
          <div className="text-lg font-bold border-b-2 border-slate-600 py-1 flex justify-between">
            <span>&lt;&gt;Your Passwords</span>
            <button
              onClick={allClear}
              className="cursor-pointer bg-red-500 hover:bg-red-600 transition-all rounded-full px-3 py-1 text-white font-semibold border border-white"
            >
              Clear all
            </button>
          </div>

          {passwordsArray.length === 0 && (
            <div className="px-10 mt-3 font-semibold text-gray-500">
              No passwords
            </div>
          )}
          {passwordsArray.length !== 0 && (
            <table className="bg-blue-200 min-w-[700px] rounded-lg overflow-hidden mt-2">
              <thead className="bg-blue-400">
                <tr>
                  <th className="text-left px-2 py-2">URL</th>
                  <th className="text-left px-2 py-2">Username</th>
                  <th className="text-left px-2 py-2">Password</th>
                  <th className="text-left px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordsArray.map((data, idx) => {
                  return (
                    <tr key={idx} className="border-b border-slate-400">
                      <td className="text-left px-2 py-1">
                        <div
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => {
                            copyText(data.Url);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/ueoydrft.json"
                            trigger="click"
                            stroke="bold"
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: "gray",
                              borderRadius: "100%",
                            }}
                          ></lord-icon>
                          <a href={data.Url} target="_blank">
                            {data.Url}
                          </a>
                        </div>
                      </td>
                      <td className="text-left px-2 py-1">
                        <div
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => {
                            copyText(data.Username);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/ueoydrft.json"
                            trigger="click"
                            stroke="bold"
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: "gray",
                              borderRadius: "100%",
                            }}
                          ></lord-icon>
                          {data.Username}
                        </div>
                      </td>
                      <td className="text-left px-2 py-1">
                        <div
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => {
                            copyText(data.Password);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/ueoydrft.json"
                            trigger="click"
                            stroke="bold"
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: "gray",
                              borderRadius: "100%",
                            }}
                          ></lord-icon>
                          {data.Password}
                        </div>
                      </td>
                      <td className="text-left px-2 py-1">
                        <div className="flex items-center gap-2">
                          <span
                            onClick={() => {
                              deletePassword(data.id);
                            }}
                            className="cursor-pointer"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/hwjcdycb.json"
                              trigger="click"
                              stroke="bold"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </span>

                          <span
                            onClick={() => {
                              editPassword(data.id);
                            }}
                            className="cursor-pointer"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/fikcyfpp.json"
                              trigger="click"
                              stroke="bold"
                              colors="primary:#121331,secondary:#000000"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
