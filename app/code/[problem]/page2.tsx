// 'use client';

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { classnames } from "../../../utils/general";
// import { languageOptions } from "../../../constants/languageOptions";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { defineTheme } from "../../../lib/defineTheme";
// import useKeyPress from "../../../hooks/useKeyPress";
// import CodeEditorWindow from "../../../components/editor/CodeEditorWindow";
// import OutputWindow from "../../../components/editor/OutputWindow";
// import CustomInput from "../../../components/editor/CustomInput";
// import OutputDetails from "../../../components/editor/OutputDetails";
// import ThemeDropdown from "../../../components/editor/ThemeDropdown";
// import LanguagesDropdown from "../../../components/editor/LanguagesDropdown";
// import {
//     twoSum,
//     mergeTwoSortedLists,
// } from "./data";

// const javascriptDefault = `/**
//     * Problem: Binary Search: Search a sorted array for a target value.
//     */

//     // Time: O(log n)
//     const binarySearch = (arr, target) => {
//     return binarySearchHelper(arr, target, 0, arr.length - 1);
//     };

//     const binarySearchHelper = (arr, target, start, end) => {
//     if (start > end) {
//     return false;
//     }
//     let mid = Math.floor((start + end) / 2);
//     if (arr[mid] === target) {
//     return mid;
//     }
//     if (arr[mid] < target) {
//     return binarySearchHelper(arr, target, mid + 1, end);
//     }
//     if (arr[mid] > target) {
//     return binarySearchHelper(arr, target, start, mid - 1);
//     }
//     };

//     const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//     const target = 5;
//     console.log(binarySearch(arr, target));
//     `;

// interface Problem {
//     title: string;
//     difficulty: string;
//     description: string;
//     examples: {
//         input: any;
//         output: any;
//     }[];
//     constraints?: string[];
//     starterCode: {
//         javascript: string;
//         python: string;
//         java: string;
//         cpp: string;
//     };
// }
// const Landing = ({ params }: { params: { problem: string } }) => {
//     // const [example, setExample] = useState({});
//     const [isFullScreen, setIsFullScreen] = useState(false);
//     const [example, setExample] = useState<Problem>({
//         title: "Problem Title",
//         difficulty: "Easy",
//         description: "Problem Description",
//         examples: [
//             {
//                 input: [10, 2, -10, 5, 20],
//                 output: 37,
//             },
//             {
//                 input: [10, 2, -10, 5, 20],
//                 output: 37,
//             },
//             {
//                 input: [10, 2, -10, 5, 20],
//                 output: 37,
//             },
//         ],
//         starterCode: {
//             javascript: '',
//             python: '',
//             java: '',
//             cpp: '',
//         }
//     });

//     const [customInput, setCustomInput] = useState("");
//     const [outputDetails, setOutputDetails] = useState(null);
//     const [processing, setProcessing] = useState<Boolean | any>(false);
//     const [theme, setTheme] = useState("cobalt" as any);
//     const [language, setLanguage] = useState<{
//         id: number;
//         name: string;
//         value: string;
//         label: string;
//     }>(languageOptions[0]);
//     const [code, setCode] = useState(example?.starterCode?.javascript);

//     const enterPress = useKeyPress("Enter");
//     const ctrlPress = useKeyPress("Control");

//     useEffect(() => {
//         if (params && params.problem) {
//             console.log(params.problem);
//             if (params.problem == "two-sum") {
//                 setExample(twoSum);
//             }
//             if (params.problem == "merge-two-sorted-lists") {
//                 setExample(mergeTwoSortedLists);
//             }
//         } else {
//             setExample(twoSum);
//         }
//     }, []);

//     // function handleEditorDidMount() {
//     //     setIsEditorReady(true);
//     // }

//     function toggleTheme() {
//         setTheme(theme === "light" ? "vs-dark" : "light");
//     }

//     // function toggleLanguage() {
//     //     setLanguage(language?.value === "javascript" ? "python" : "javascript");
//     // }

//     // Toggle full screen
//     const toggleFullScreen = () => {
//         // console.log("toggleFullScreen");
//         const element = document.documentElement;
//         console.log(element);

//         if (!isFullScreen) {
//             if ((element as any).requestFullscreen) {
//                 (element as any).requestFullscreen();
//             } else if ((element as any).mozRequestFullScreen) {
//                 (element as any).mozRequestFullScreen();
//             } else if ((element as any).webkitRequestFullscreen) {
//                 (element as any).webkitRequestFullscreen();
//             } else if ((element as any).msRequestFullscreen) {
//                 (element as any).msRequestFullscreen();
//             }
//         } else {
//             if ((document as any).exitFullscreen) {
//                 (document as any).exitFullscreen();
//             } else if ((document as any).mozCancelFullScreen) {
//                 (document as any).mozCancelFullScreen();
//             } else if ((document as any).webkitExitFullscreen) {
//                 (document as any).webkitExitFullscreen();
//             } else if ((document as any).msExitFullscreen) {
//                 (document as any).msExitFullscreen();
//             }
//         }

//         setIsFullScreen(!isFullScreen);
//     };

//     const onSelectChange = (sl: any) => {
//         console.log("selected Option...", sl);
//         setLanguage(sl);
//     };

//     useEffect(() => {
//         if (enterPress && ctrlPress) {
//             console.log("enterPress", enterPress);
//             console.log("ctrlPress", ctrlPress);
//             handleCompile();
//         }
//     }, [ctrlPress, enterPress]);
//     const onChange = (action: any, data: any) => {
//         switch (action) {
//             case "code": {
//                 setCode(data);
//                 break;
//             }
//             default: {
//                 console.warn("case not handled!", action, data);
//             }
//         }
//     };
//     const handleCompile = () => {
//         setProcessing(true);
//         const formData = {
//             language_id: language.id,
//             // encode source code in base64
//             source_code: btoa(code),
//             stdin: btoa(customInput),
//         };
//         const options = {
//             method: "POST",
//             url: process.env.REACT_APP_RAPID_API_URL,
//             params: { base64_encoded: "true", fields: "*" },
//             headers: {
//                 "content-type": "application/json",
//                 "Content-Type": "application/json",
//                 "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
//                 "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//             },
//             data: formData,
//         };

//         axios
//             .request(options)
//             .then(function (response) {
//                 console.log("res.data", response.data);
//                 const token = response.data.token;
//                 checkStatus(token);
//             })
//             .catch((err) => {
//                 let error = err.response ? err.response.data : err;
//                 // get error status
//                 let status = err.response.status;
//                 console.log("status", status);
//                 if (status === 429) {
//                     console.log("too many requests", status);

//                     showErrorToast(
//                         `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
//                         10000
//                     );
//                 }
//                 setProcessing(false);
//                 console.log("catch block...", error);
//             });
//     };

//     const checkStatus = async (token: any) => {
//         const options = {
//             method: "GET",
//             url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
//             params: { base64_encoded: "true", fields: "*" },
//             headers: {
//                 "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
//                 "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//             },
//         };
//         try {
//             let response = await axios.request(options);
//             let statusId = response.data.status?.id;

//             // Processed - we have a result
//             if (statusId === 1 || statusId === 2) {
//                 // still processing
//                 setTimeout(() => {
//                     checkStatus(token);
//                 }, 2000);
//                 return;
//             } else {
//                 setProcessing(false);
//                 setOutputDetails(response.data);
//                 showSuccessToast(`Compiled Successfully!`);
//                 console.log("response.data", response.data);
//                 return;
//             }
//         } catch (err) {
//             console.log("err", err);
//             setProcessing(false);
//             showErrorToast();
//         }
//     };

//     function handleThemeChange(th: any) {
//         const theme = th;
//         console.log("theme...", theme);

//         if (["light", "vs-dark"].includes(theme.value)) {
//             setTheme(theme);
//         } else {
//             defineTheme(theme.value).then((_) => setTheme(theme));
//         }
//     }
//     useEffect(() => {
//         defineTheme("oceanic-next").then((_) =>
//             setTheme({ value: "oceanic-next", label: "Oceanic Next" })
//         );
//     }, []);

//     const showSuccessToast = (msg: any) => {
//         toast.success(msg || `Compiled Successfully!`, {
//             position: "top-right",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });
//     };
//     const showErrorToast = (msg?: any, timer?: any) => {
//         toast.error(msg || `Something went wrong! Please try again.`, {
//             position: "top-right",
//             autoClose: timer ? timer : 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });
//     };

//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//             />
//             {/* <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div> */}
//             <div className="flex flex-row">
//                 <div className="px-4 py-2">
//                     <LanguagesDropdown onSelectChange={onSelectChange} />
//                 </div>
//                 <div className="px-4 py-2">
//                     <ThemeDropdown
//                         handleThemeChange={handleThemeChange}
//                         theme={theme}
//                     />
//                 </div>
//             </div>
//             <div className="flex flex-row space-x-4 items-start px-4 py-4">
//                 <div className="flex flex-col w-full h-full justify-start items-end">
//                     <CodeEditorWindow
//                         code={code}
//                         onChange={onChange}
//                         language={language?.value}
//                         theme={theme?.value}
//                     />
//                 </div>

//                 <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
//                     <OutputWindow outputDetails={outputDetails} />
//                     <div className="flex flex-col items-end">
//                         <CustomInput
//                             customInput={customInput}
//                             setCustomInput={setCustomInput}
//                         />
//                         <button
//                             onClick={handleCompile}
//                             disabled={!code}
//                             className={classnames(
//                                 "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
//                                 !code ? "opacity-50" : ""
//                             )}
//                         >
//                             {processing
//                                 ? "Processing..."
//                                 : "Compile and Execute"}
//                         </button>
//                     </div>
//                     {outputDetails && (
//                         <OutputDetails outputDetails={outputDetails} />
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };
// export default Landing;

// =---------------------------------------------------------------------------=

// 'use client';

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { classnames } from "../../../utils/general";
// import { languageOptions } from "../../../constants/languageOptions";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { defineTheme } from "../../../lib/defineTheme";
// import useKeyPress from "../../../hooks/useKeyPress";
// import CodeEditorWindow from "../../../components/editor/CodeEditorWindow";
// import OutputWindow from "../../../components/editor/OutputWindow";
// import CustomInput from "../../../components/editor/CustomInput";
// import OutputDetails from "../../../components/editor/OutputDetails";
// import ThemeDropdown from "../../../components/editor/ThemeDropdown";
// import LanguagesDropdown from "../../../components/editor/LanguagesDropdown";
// import {
//     twoSum,
//     mergeTwoSortedLists,
// } from "./data";

// const javascriptDefault = `/**
//     * Problem: Binary Search: Search a sorted array for a target value.
//     */

//     // Time: O(log n)
//     const binarySearch = (arr, target) => {
//     return binarySearchHelper(arr, target, 0, arr.length - 1);
//     };

//     const binarySearchHelper = (arr, target, start, end) => {
//     if (start > end) {
//     return false;
//     }
//     let mid = Math.floor((start + end) / 2);
//     if (arr[mid] === target) {
//     return mid;
//     }
//     if (arr[mid] < target) {
//     return binarySearchHelper(arr, target, mid + 1, end);
//     }
//     if (arr[mid] > target) {
//     return binarySearchHelper(arr, target, start, mid - 1);
//     }
//     };

//     const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//     const target = 5;
//     console.log(binarySearch(arr, target));
//     `;

// interface Problem {
//     title: string;
//     difficulty: string;
//     description: string;
//     examples: {
//         input: any;
//         output: any;
//     }[];
//     constraints?: string[];
//     starterCode: {
//         javascript: string;
//         python: string;
//         java: string;
//         cpp: string;
//         [key: string]: string;
//     };
// }
// const Landing = ({ params }: { params: { problem: string } }) => {
//     const [isFullScreen, setIsFullScreen] = useState(false);
//     const [example, setExample] = useState<Problem>({
//         title: "Problem Title",
//         difficulty: "Easy",
//         description: "Problem Description",
//         examples: [
//             {
//                 input: [10, 2, -10, 5, 20],
//                 output: 37,
//             },
//             {
//                 input: [10, 2, -10, 5, 20],
//                 output: 37,
//             },
//             {
//                 input: [10, 2, -10, 5, 20],
//                 output: 37,
//             },
//         ],
//         starterCode: {
//             javascript: javascriptDefault,
//             python: '',
//             java: '',
//             cpp: '',
//         }
//     });

//     interface Language {
//         id: number;
//         name: string;
//         value: string;
//         label: string;
//     };

//     const [customInput, setCustomInput] = useState("");
//     const [outputDetails, setOutputDetails] = useState(null);
//     const [processing, setProcessing] = useState<Boolean | any>(false);
//     const [theme, setTheme] = useState("cobalt" as any);
//     const [language, setLanguage] = useState<Language>(languageOptions[0]);
//     const [code, setCode] = useState(example?.starterCode?.javascript);

//     const enterPress = useKeyPress("Enter");
//     const ctrlPress = useKeyPress("Control");

//     useEffect(() => {
//         if (params && params.problem) {
//             console.log(params.problem);
//             if (params.problem == "two-sum") {
//                 setExample(twoSum);
//             }
//             if (params.problem == "merge-two-sorted-lists") {
//                 setExample(mergeTwoSortedLists);
//             }
//         } else {
//             setExample(twoSum);
//         }
//     }, []);

//     useEffect(() => {
//         defineTheme("oceanic-next").then((_) =>
//             setTheme({ value: "oceanic-next", label: "Oceanic Next" })
//         );
//     }, []);

//     function toggleTheme() {
//         setTheme(theme === "light" ? "vs-dark" : "light");
//     }

//     //  Toggle full screen
//     const toggleFullScreen = () => {
//         // console.log("toggleFullScreen");
//         const element = document.documentElement;
//         console.log(element);

//         if (!isFullScreen) {
//             if ((element as any).requestFullscreen) {
//                 (element as any).requestFullscreen();
//             } else if ((element as any).mozRequestFullScreen) {
//                 (element as any).mozRequestFullScreen();
//             } else if ((element as any).webkitRequestFullscreen) {
//                 (element as any).webkitRequestFullscreen();
//             } else if ((element as any).msRequestFullscreen) {
//                 (element as any).msRequestFullscreen();
//             }
//         } else {
//             if ((document as any).exitFullscreen) {
//                 (document as any).exitFullscreen();
//             } else if ((document as any).mozCancelFullScreen) {
//                 (document as any).mozCancelFullScreen();
//             } else if ((document as any).webkitExitFullscreen) {
//                 (document as any).webkitExitFullscreen();
//             } else if ((document as any).msExitFullscreen) {
//                 (document as any).msExitFullscreen();
//             }
//         }

//         setIsFullScreen(!isFullScreen);
//     };

//     const onSelectChange = (sl: Language) => {
//         console.log("selected Option...", sl);
//         setLanguage(sl);
//         const selectedLanguageCode = example?.starterCode && example?.starterCode[sl.value];
//         setCode(selectedLanguageCode || '');
//         console.log("selectedLanguageCode", selectedLanguageCode);
//         console.log("code", code);
//         console.log("example", example);
//     };



//     useEffect(() => {
//         if (enterPress && ctrlPress) {
//             console.log("enterPress", enterPress);
//             console.log("ctrlPress", ctrlPress);
//             handleCompile();
//         }
//     }, [ctrlPress, enterPress]);

//     const onChange = (action: any, data: any) => {
//         switch (action) {
//             case "code": {
//                 setCode(data);
//                 break;
//             }
//             default: {
//                 console.warn("case not handled!", action, data);
//             }
//         }
//     };

//     const handleCompile = () => {
//         setProcessing(true);
//         const formData = {
//             language_id: language.id,
//             source_code: btoa(code),
//             stdin: btoa(customInput),
//         };

//         const options = {
//             method: "POST",
//             url: process.env.REACT_APP_RAPID_API_URL,
//             params: { base64_encoded: "true", fields: "*" },
//             headers: {
//                 "content-type": "application/json",
//                 "Content-Type": "application/json",
//                 "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
//                 "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//             },
//             data: formData,
//         };

//         axios
//             .request(options)
//             .then(function (response) {
//                 console.log("res.data", response.data);
//                 const token = response.data.token;
//                 checkStatus(token);
//             })
//             .catch((err) => {
//                 let error = err.response ? err.response.data : err;
//                 let status = err.response.status;
//                 console.log("status", status);
//                 if (status === 429) {
//                     showErrorToast(
//                         `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
//                         10000
//                     );
//                 }
//                 setProcessing(false);
//                 console.log("catch block...", error);
//             });
//     };

//     const checkStatus = async (token: any) => {
//         const options = {
//             method: "GET",
//             url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
//             params: { base64_encoded: "true", fields: "*" },
//             headers: {
//                 "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
//                 "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//             },
//         };
//         try {
//             let response = await axios.request(options);
//             let statusId = response.data.status?.id;

//             if (statusId === 1 || statusId === 2) {
//                 setTimeout(() => {
//                     checkStatus(token);
//                 }, 2000);
//                 return;
//             } else {
//                 setProcessing(false);
//                 setOutputDetails(response.data);
//                 showSuccessToast(`Compiled Successfully!`);
//                 console.log("response.data", response.data);
//                 return;
//             }
//         } catch (err) {
//             console.log("err", err);
//             setProcessing(false);
//             showErrorToast();
//         }
//     };

//     function handleThemeChange(th: any) {
//         const theme = th;
//         console.log("theme...", theme);

//         if (["light", "vs-dark"].includes(theme.value)) {
//             setTheme(theme);
//         } else {
//             defineTheme(theme.value).then((_) => setTheme(theme));
//         }
//     }

//     const showSuccessToast = (msg: any) => {
//         toast.success(msg || `Compiled Successfully!`, {
//             position: "top-right",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });
//     };

//     const showErrorToast = (msg?: any, timer?: any) => {
//         toast.error(msg || `Something went wrong! Please try again.`, {
//             position: "top-right",
//             autoClose: timer ? timer : 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });
//     };

//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//             />
//             <div className="flex flex-row">
//                 <div className="px-4 py-2">
//                     <LanguagesDropdown onSelectChange={onSelectChange} />
//                 </div>
//                 <div className="px-4 py-2">
//                     <ThemeDropdown
//                         handleThemeChange={handleThemeChange}
//                         theme={theme}
//                     />
//                 </div>
//             </div>
//             <div className="flex flex-row space-x-4 items-start px-4 py-4">
//                 <div className="flex flex-col w-full h-full justify-start items-end">
//                     <CodeEditorWindow
//                         code={code}
//                         onChange={onChange}
//                         language={language?.value}
//                         theme={theme?.value}
//                     />

//                 </div>

//                 <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
//                     <OutputWindow outputDetails={outputDetails} />
//                     <div className="flex flex-col items-end">
//                         <CustomInput
//                             customInput={customInput}
//                             setCustomInput={setCustomInput}
//                         />
//                         <button
//                             onClick={handleCompile}
//                             disabled={!code}
//                             className={classnames(
//                                 "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
//                                 !code ? "opacity-50" : ""
//                             )}
//                         >
//                             {processing
//                                 ? "Processing..."
//                                 : "Compile and Execute"}
//                         </button>
//                     </div>
//                     {outputDetails && (
//                         <OutputDetails outputDetails={outputDetails} />
//                     )}
//                 </div>
//             </div>
//             <button
//                 onClick={toggleFullScreen}
//                 className="fixed bottom-4 right-4 p-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
//             >
//                 {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
//             </button>
//         </>
//     );
// };
// export default Landing;
