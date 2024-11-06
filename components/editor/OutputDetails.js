import React from "react";

const OutputDetails = ({ outputDetails }) => {
    const hasError = outputDetails.status?.id !== 3; // Assuming status id 3 is 'Success'

    return (
        <div className="metrics-container mt-4 flex flex-col space-y-3">
            <p className="text-sm">
                Status:{" "}
                <span className={`font-semibold px-2 py-1 rounded-md ${hasError ? 'bg-red-100' : 'bg-gray-100'}`}>
                    {outputDetails?.status?.description}
                </span>
            </p>
            {hasError ? (
                <p className="text-sm text-red-500">
                    Error:{" "}
                    <span className="font-semibold">
                        {outputDetails?.stderr || outputDetails?.message}
                    </span>
                </p>
            ) : (
                <>
                    <p className="text-sm">
                        Memory:{" "}
                        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                            {outputDetails?.memory}
                        </span>
                    </p>
                    <p className="text-sm">
                        Time:{" "}
                        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                            {outputDetails?.time}
                        </span>
                    </p>
                </>
            )}
        </div>
    );
};

export default OutputDetails;
