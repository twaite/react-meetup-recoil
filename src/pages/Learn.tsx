export default function LearnPage() {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Support center
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Welcome to our Support Center, your one-stop destination for all
              things related to our tool! Whether you have questions, need
              assistance, or want to explore advanced features, our dedicated
              team is here to guide you every step of the way. Get ready to
              embark on a smooth and efficient journey towards achieving your
              productivity goals. We're thrilled to have you on board!
            </p>
          </div>
        </div>
      </div>
      <FAQs />
    </>
  );
}

const faqs = [
  {
    question: "How can I get started with our amazing productivity tool?",
    answer:
      "Getting started is a breeze! Simply sign up for an account, and you’ll have instant access to our powerful features. Our comprehensive onboarding guide will walk you through everything you need to know.",
  },
  {
    question: "What kind of support do you offer to users?",
    answer:
      "We take pride in our top-notch customer support. Our dedicated team is available 24/7 to assist you with any questions or issues you may encounter. We offer various support channels, including live chat, email, and an extensive knowledge base.",
  },
  // Add more questions and answers as needed...
];

function FAQs() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Can’t find the answer you’re looking for? Reach out to our{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                customer support
              </a>{" "}
              team.
            </p>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <dl className="space-y-10">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
