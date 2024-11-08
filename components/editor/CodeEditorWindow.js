import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
    const [value, setValue] = useState(code || "");

    useEffect(() => {
        setValue(code); // Update the value state whenever the code prop changes
    }, [code]);

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="85vh"
                width={`100%`}
                language={language || "javascript"}
                value={value}
                theme={theme}
                defaultValue="// some comment"
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CodeEditorWindow;
