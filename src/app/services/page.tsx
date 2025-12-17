export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          {/* Service For Candidate */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Service For Candidate
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg italic text-gray-700 mb-2">
                  "Find out what you like doing best and get someone to pay you doing it"
                </p>
                <p className="text-lg italic text-gray-700">
                  "Choose a job you love and you will never have to work a day in your life"
                </p>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  Evanios Jobs Pvt Ltd is always at the service of our esteemed job seekers, making sure that you get the right job and pursue a satisfying career. Evanios Jobs ensure job seekers can find the best job search portal in India that matches their skills and qualifications. Job seekers can quickly find jobs that match their skills, experience and qualifications with an easy to use interface and a user friendly search engine. Your satisfaction is our prime concern. Our website provides you with free registration possibility and opportunity to upload your bio-data at free of cost. If you register with us, you will be given access to lakhs of matching jobs and the possibility to apply for any number of jobs that you like and your interest. With the personal username and password, we provide, you can login into the website and look for the matching job and apply as well. You could also search in our website for the jobs of your interest from among the lakhs of jobs across India. You will be also notified regularly all through whatsapp all the new matching job vacancies uploaded on our website. If your bio-data gets selected by any employer, you will get the timely alert about that as well through SMS. Lakhs of job seekers who had registered with us are now well-placed in different sectors of their interest, they are our pride….our credentials are displayed through their success in career and life.
                </p>
              </div>
            </div>
          </div>

          {/* Service For Employer */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Service For Employer
            </h2>
            <div className="space-y-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  Evanios Jobs are a job portal that provides a hiring tool to help businesses hire people worldwide. Employers can quickly post jobs for free on www.evaniosjobs.com and gain quick access to targeted talent from a large talent pool. This job portal is an effective and cost effective solution for businesses to streamline their hiring process and quickly find suitable candidates.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  No more advertisements... No more frantic search for the right candidate… No worry about the quality and qualification of the candidate… Evanios Jobs Pvt Ltd is used as the main tool for talent acquisition by lakhs of recruiters across all kinds and sizes of industry. They appreciate Evanios Jobs services and highly recommend it as the one stop solution to all the hiring needs of a company. Evanios Jobs is a job portal that provides a hiring tool to help businesses hire people worldwide. Employers can quickly post jobs for free on Evanios Jobs and gain quick access to targeted talent from a large talent pool. This job portal is an effective and cost effective solution for businesses to streamline their hiring process and quickly find suitable candidates. Evanios Jobs Pvt Ltd is at the service of all the esteemed employers. We provide you with the right and best candidate at your door step. You are provided the golden opportunity to register the job vacancies on our website at free of cost. If you register with us, you can view and select the matching candidates from among the lakhs of bio-data registered with us. You could also login into the website to search for the right and matching candidates using the username and password we provide you with. We also intimate all the matching candidates all through Whatsapp details regarding the job vacancies available in your esteemed firm or institution. The selected candidates are also informed through Whatsapp, after you have selected them. We will also inform you through whatsapp, details of all the candidates applying for jobs in your esteemed firm or institution. Lakhs of employers and reputed firms registered with us speak volumes of our credibility and state of quality service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


