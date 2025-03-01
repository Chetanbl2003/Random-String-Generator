import { useState, useCallback, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  

const StringGenerator = () => {
  const [randomString, setRandomString] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const generateRandomString = useCallback(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomString(result);
  }, []);

  const clearString = () => {
    setRandomString("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(randomString);
    toast.success("Copied!", {
      position: "top-right",
      autoClose: 1500, 
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} h-screen flex justify-center items-center`}>
      <div className={`p-6 shadow-lg rounded-xl w-96 transition-all duration-500 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <h2 className="text-xl font-bold text-center mb-4">Random String Generator</h2>

        <div className={`flex items-center border rounded-lg overflow-hidden p-2 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}>
          <input 
            type="text" 
            value={randomString} 
            readOnly 
            className={`flex-1 p-2 bg-transparent outline-none ${darkMode ? "text-white" : "text-black"}`}
          />
          <button onClick={copyToClipboard} className="text-gray-500 hover:text-gray-300">
            📋
          </button>
        </div>

        <div className="flex justify-between mt-4">
          <button 
            onClick={generateRandomString} 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
          >
            🔄 Generate New String
          </button>
          <button 
            onClick={clearString} 
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
          >
            ❌ Clear
          </button>
        </div>

        <button 
          onClick={toggleDarkMode} 
          className="mt-4 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default StringGenerator;
