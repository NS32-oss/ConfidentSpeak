import Image from "next/image";

interface whydata {
    heading: string;
    subheading: string;
}

const whydata: whydata[] = [
    {
        "heading": "Comprehensive AI Speech Analysis",
        "subheading": "Analyze body language, vocal tone, pacing, and more."
    },
    {
        "heading": "Real-Time Feedback and Coaching",
        "subheading": "AI assistant provides guidance on speech delivery and audience engagement."
    },
    {
        "heading": "Precision in Presentation Improvement",
        "subheading": "Review recorded practice sessions with detailed feedback at precise timestamps."
    }    
];

const Why = () => {
    return (
        <div id="about">
            <div className="mx-auto max-w-7xl px-4 my-20 sm:py-20 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* COLUMN-1 */}
                    <div className="lg:-ml-64">
                        <Image
                            src="/assets/why/iPad.png"
                            alt="iPad-image"
                            width={4000}
                            height={900}
                        />
                    </div>

                    {/* COLUMN-2 */}
                    <div>
                        <h3 className="text-4xl lg:text-5xl pt-4 font-semibold sm:leading-tight mt-5 text-center lg:text-start">
                            Why we are the best?
                        </h3>
                        <h4 className="text-lg pt-4 font-normal sm:leading-tight text-center text-beach lg:text-start">
                            Dont waste time on search manual tasks. Let
                            Automation do it for you. Simplify workflows, reduce
                            errors, and save time.
                        </h4>

                        <div className="mt-10">
                            {whydata.map((items, index) => (
                                <div className="flex mt-4" key={index}>
                                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-circlebg">
                                        <Image
                                            src="/assets/why/check.svg"
                                            alt="check-image"
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-2xl font-semibold">
                                            {items.heading}
                                        </h4>
                                        <h5 className="text-lg text-beach font-normal mt-2">
                                            {items.subheading}
                                        </h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Why;
