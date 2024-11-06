"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Navbar from "../components/Navbar/Navbar";
import { problems, imageMap } from "./problems";

const TableContent = () => {

    const [selectedCompany, setSelectedCompany] = useState("All");
    const [filteredProblems, setFilteredProblems] = useState(problems);

    const companies = ["All", "Facebook", "Google", "Microsoft", "Netflix", "Amazon", "Uber", "Apple"];

    useEffect(() => {
        if (selectedCompany === "All") {
            setFilteredProblems(problems);
        } else {
            const filtered = problems.filter(problem => problem.company.includes(selectedCompany));
            setFilteredProblems(filtered);
        }
    }, [selectedCompany]);
    return (
        <div className="banner-image">
            <Navbar />
            <main>
                <div className="px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl pt-18 sm:pt-24 pb-20 w-full flex justify-center items-center flex-col">
                        <div className="flex space-x-4 mb-4">
                            {companies.map(company => (
                                <button
                                    key={company}
                                    className={`px-4 py-2 rounded-full text-white ${selectedCompany === company ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    onClick={() => setSelectedCompany(company)}
                                >
                                    {company}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center w-[80vw] md:w-[60vw] items-center">
                            {/* Filter Chips */}

                            <Table className="bg-gray-200 bg-opacity-70">
                                <TableCaption>
                                    A list of all the problems you can solve.
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Prolem No.</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Difficulty</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProblems.map((problem) => (
                                        <TableRow key={problem.no}>
                                            <TableCell className="font-medium">
                                                {problem.no}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={`/code/${problem.slug}`}
                                                >
                                                    {problem.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-start gap-1 items-center">
                                                    {Array.isArray(problem.company) && problem.company.map((company: string, index: any) => {
                                                        return (
                                                            <Image
                                                                key={index}
                                                                src={imageMap[company]}
                                                                alt={company}
                                                                width={30}
                                                                height={30}
                                                            />

                                                        );
                                                    })}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className={
                                                        problem.difficulty ===
                                                            "Hard"
                                                            ? "bg-red-400 text-black p-1 px-2 rounded-full hover:bg-red-500 w-fit text-center"
                                                            : problem.difficulty ===
                                                                "Medium"
                                                                ? "bg-yellow-300 text-black p-1 px-2 rounded-full hover:bg-yellow-400 w-fit text-center"
                                                                : "bg-green-500 text-black p-1 px-2 rounded-full hover:bg-green-600 w-fit text-center"
                                                    }
                                                >
                                                    {problem.difficulty}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TableContent;
