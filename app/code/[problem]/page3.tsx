'use client';

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
import { twoSum, mergeTwoSortedLists } from "./data";

interface Problem {
    title: string;
    difficulty: string;
    description: string;
    examples: {
        input: any;
        output: any;
    }[];
    constraints?: string[];
    starterCode: {
        javascript: string;
        python: string;
        java: string;
        cpp: string;
        [key: string]: string;
    };
}

const Landing = ({ params }: { params: { problem: string } }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [example, setExample] = useState<Problem>(twoSum);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [theme, setTheme] = useState<any>("cobalt");
    const [language, setLanguage] = useState(languageOptions[0]);
    const [code, setCode] = useState(example?.starterCode?.javascript);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    useEffect(() => {
        if (params && params.problem && (params.problem === "two-sum" || params.problem === "merge-two-sorted-lists")) {
            setExample(params.problem === "two-sum" ? twoSum : mergeTwoSortedLists);
        }
    }, [params]);

    useEffect(() => {
        defineTheme("oceanic-next").then((_) => setTheme({ value: "oceanic-next", label: "Oceanic Next" }));
    }, []);

    // This useEffect watches the 'language' state and updates the 'code' state accordingly
    useEffect(() => {
        setCode(example?.starterCode && example?.starterCode[language.value] || '');
        console.log("code", code);
        console.log("example", example.starterCode[language.value]);
    }, [language, example]);

    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

    const onSelectChange = (selectedLanguage: any) => {
        setLanguage(selectedLanguage);
        console.log("selectedLanguage", selectedLanguage);
        // setCode(example?.starterCode && example?.starterCode[selectedLanguage.value] || '');
    };

    const onChange = (action: string, data: any) => {
        console.log("action", action);
        console.log("data", data);
        if (action === "code") {
            setCode(data);
        } else {
            console.warn("Case not handled!", action, data);
        }
    };

    const handleCompile = () => {
        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(customInput),
        };

        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: formData,
        };

        axios
            .request(options)
            .then((response) => {
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                handleCompileError(err);
            });
    };

    const checkStatus = async (token: any) => {
        const options = {
            method: "GET",
            url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };

        try {
            const response = await axios.request(options);
            const statusId = response.data.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => checkStatus(token), 2000);
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                showSuccessToast("Compiled Successfully!");
            }
        } catch (err) {
            handleCompileError(err);
        }
    };

    const handleCompileError = (err: any) => {
        const error = err.response ? err.response.data : err;
        const status = err.response.status;

        if (status === 429) {
            showErrorToast(`Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to set up your own RAPID API Judge0!`, 10000);
        }

        setProcessing(false);
        console.error("Error:", error);
        showErrorToast();
    };

    const handleThemeChange = (selectedTheme: any) => {
        if (["light", "vs-dark"].includes(selectedTheme.value)) {
            setTheme(selectedTheme);
        } else {
            defineTheme(selectedTheme.value).then((_) => setTheme(selectedTheme));
        }
    };

    const showSuccessToast = (msg: string) => {
        toast.success(msg || "Compiled Successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showErrorToast = (msg?: string, timer?: number) => {
        toast.error(msg || "Something went wrong! Please try again.", {
            position: "top-right",
            autoClose: timer || 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const toggleFullScreen = () => {
        const element = document.documentElement;
        console.log(element);

        if (!isFullScreen) {
            if ((element as any).requestFullscreen) {
                (element as any).requestFullscreen();
            } else if ((element as any).mozRequestFullScreen) {
                (element as any).mozRequestFullScreen();
            } else if ((element as any).webkitRequestFullscreen) {
                (element as any).webkitRequestFullscreen();
            } else if ((element as any).msRequestFullscreen) {
                (element as any).msRequestFullscreen();
            }
        } else {
            if ((document as any).exitFullscreen) {
                (document as any).exitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        }

        setIsFullScreen(!isFullScreen);
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
                    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
                    <CodeEditorWindow
                        code={example.starterCode[language.value]}
                        onChange={onChange}
                        language={language?.value}
                        theme={theme?.value}
                    />
                </div>

                <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
                    <OutputWindow outputDetails={outputDetails} />
                    <div className="flex flex-col items-end">
                        <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
                        <button
                            onClick={handleCompile}
                            disabled={!code}
                            className={classnames(
                                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                                !code ? "opacity-50" : ""
                            )}
                        >
                            {processing ? "Processing..." : "Compile and Execute"}
                        </button>
                    </div>
                    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                </div>
            </div>
            <button
                onClick={toggleFullScreen}
                className="fixed bottom-4 right-4 p-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
            >
                {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
        </>
    );
};

export default Landing;
