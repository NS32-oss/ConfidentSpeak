"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { classnames } from "../../../utils/general";
import { languageOptions } from "../../../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../../../lib/defineTheme";
import useKeyPress from "../../../hooks/useKeyPress";
import CodeEditorWindow from "../../../components/editor/CodeEditorWindow";
import OutputWindow from "../../../components/editor/OutputWindow";
import CustomInput from "../../../components/editor/CustomInput";
import OutputDetails from "../../../components/editor/OutputDetails";
import ThemeDropdown from "../../../components/editor/ThemeDropdown";
import LanguagesDropdown from "../../../components/editor/LanguagesDropdown";
import { twoSum, mergeTwoSortedLists, reverseALinkedList } from "./data";

const problemData = {
    "two-sum": twoSum,
    "merge-two-sorted-lists": mergeTwoSortedLists,
    "reverse-linked-list": reverseALinkedList
};

const Landing = ({ params }) => {
    const [code, setCode] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(languageOptions[0]);
    const [problem, setProblem] = useState(null);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    useEffect(() => {
        const problemId = params.problem;
        const selectedProblem = problemData[problemId];
        if (selectedProblem) {
            setCode(selectedProblem.starterCode.javascript);
        }
    }, [params.problem]);

    const onSelectChange = (sl) => {
        setLanguage(sl);
        const problemId = params.problem;
        const selectedProblem = problemData[problemId];
        if (selectedProblem) {
            setCode(selectedProblem.starterCode[sl.value]); // Update the code based on the selected language
        }
    };

    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

    const onChange = (action, data) => {
        if (action === "code") {
            setCode(data);
        }
    };

    const handleCompile = () => {
        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(customInput),
        };

        fetch('https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=false', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
            },
        })
            .then(response => response.json())
            .then(data => {
                const token = data.token;
                checkStatus(token);
            })
            .catch(error => {
                console.error('Error:', error);
                setProcessing(false);
                showErrorToast(`Something went wrong! Please try again.`);
            });
    };

    const checkStatus = async (token) => {
        try {
            const response = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false&wait=false`, {
                headers: {
                    "content-type": "application/json",
                    "Content-Type": "application/json",
                    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
                    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
                },
            });
            const data = await response.json();
            let statusId = data.status?.id;

            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
            } else {
                setProcessing(false);
                console.log(data)
                setOutputDetails(data);
                showSuccessToast(`Compiled Successfully!`);
            }
        } catch (err) {
            console.error('Error:', err);
            setProcessing(false);
            showErrorToast(`Something went wrong! Please try again.`);
        }
    };


    function handleThemeChange(th) {
        const theme = th;

        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme));
        }
    }
    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
            setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
    }, []);

    const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const showErrorToast = (msg, timer) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
            position: "top-right",
            autoClose: timer ? timer : 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="flex flex-row">
                <div className="px-4 py-2">
                    <LanguagesDropdown onSelectChange={onSelectChange} />
                </div>
                <div className="px-4 py-2">
                    <ThemeDropdown
                        handleThemeChange={handleThemeChange}
                        theme={theme}
                    />
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
                    <CodeEditorWindow
                        code={code}
                        onChange={onChange}
                        language={language?.value}
                        theme={theme.value}
                    />
                </div>

                <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
                    <OutputWindow outputDetails={outputDetails} />
                    <div className="flex flex-col items-end">
                        <CustomInput
                            customInput={customInput}
                            setCustomInput={setCustomInput}
                        />
                        <button
                            onClick={handleCompile}
                            disabled={!code}
                            className={classnames(
                                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                                !code ? "opacity-50" : ""
                            )}
                        >
                            {processing
                                ? "Processing..."
                                : "Compile and Execute"}
                        </button>
                    </div>
                    {outputDetails && (
                        <OutputDetails outputDetails={outputDetails} />
                    )}
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};
export default Landing;
