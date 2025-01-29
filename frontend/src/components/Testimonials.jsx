import { User } from 'lucide-react';

const TestimonialCard = ({ author, title, heading, content, verified }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <div className="flex items-center mb-4 space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
            </div>
            <div>
                <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{author}</h3>
                    {verified && (
                        <svg className="w-4 h-4 ml-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
        </div>
        <h4 className="text-lg font-semibold mb-2">{heading}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
    </div>
);

const Testimonials = ({ middleColumnOffset = 'mt-12' }) => {
    const testimonials = {
        column1: [
            {
                author: "William Fry",
                title: "CEO @Mainhares",
                heading: "One of the most talented teams",
                content: "After 7+ years in the SaaS industry, I can confidently say that Simon from Brandby is one of the most talented designers I've worked with so far. He goes above and beyond when it comes to understanding and executing design.",
                verified: true
            },
            {
                author: "Anneet Bains",
                title: "Marketing Lead @Stepsize",
                heading: "Reliable, Fast, Easy",
                content: "Brandby were incredibly fast and came up with numerous options for us to walk-through. They solicit feedback at every opportunity and worked really hard to create the perfect design for us. We couldn't be happier, and really enjoyed working with them!",
                verified: true
            }
        ],
        column2: [
            {
                author: "Reece Akhtar",
                title: "CEO & Co-Founder @Deeper Signals",
                heading: "Amazing to work with",
                content: "Our product and website redesign went great, and we're thrilled with the end result. But more than that, Brandby was just amazing to work with and made the whole process fun and stress free. They're always super responsive, and have helped us with other design needs.",
                verified: true
            },
            {
                author: "Patrick Kelly",
                title: "CEO & Founder @ClickMagick",
                heading: "Efficiency and Excellence",
                content: "Working with Brandby has been a breeze. They really nailed the details and delivered top-notch design. If you want things done right without any fuss, Brandby is your go-to.",
                verified: true
            }
        ],
        column3: [
            {
                author: "Scott Willman",
                title: "EVP of Product Management @SmartCloud",
                heading: "Outstanding product design",
                content: "Their creativity-fueled technical skills resulted in visually stunning, user-friendly mobile app and web designs. It was an absolute pleasure working with such talented people. I highly recommend!",
                verified: true
            },
            {
                author: "Marta Tkoczek",
                title: "Product Owner @Phix",
                heading: "Excellent Design",
                content: "Working with Brandby has been a pleasure. They were fast, great in communication and crafted an excellent design.",
                verified: true
            }
        ]
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className='flex flex-col items-center py-12'>
                <h1 className='text-5xl font-bold mb-4'>Testimonials</h1>
                <p className='text-3xl font-semibold mb-8'>Listen what people want to tell about us</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1 */}
                <div className="space-y-8">
                    {testimonials.column1.map((testimonial, index) => (
                        <TestimonialCard key={`col1-${index}`} {...testimonial} />
                    ))}
                </div>

                {/* Column 2 with adjustable offset */}
                <div className={`space-y-8 ${middleColumnOffset}`}>
                    {testimonials.column2.map((testimonial, index) => (
                        <TestimonialCard key={`col2-${index}`} {...testimonial} />
                    ))}
                </div>

                {/* Column 3 */}
                <div className="space-y-8">
                    {testimonials.column3.map((testimonial, index) => (
                        <TestimonialCard key={`col3-${index}`} {...testimonial} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;