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
              Candidate Services
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg italic text-gray-700 mb-2">
                  "Learn. Get Skilled. Get Hired."
                </p>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  At TriaGullJobs, we do more than help you find jobs—we help you build a successful career by combining skill training with placement support.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Whether you are a fresher, graduate, or experienced professional looking to upgrade your skills, we provide industry-focused training that improves your employability and prepares you for real workplace requirements.
                </p>

                <p className="text-gray-800 font-bold mt-4 mb-2">Our Skill Development Programs</p>
                <ul className="text-gray-600">
                  <li>Tally Prime</li>
                  <li>GST Registration & Return Filing</li>
                  <li>Payroll Processing</li>
                  <li>MS Office (Excel, Word & PowerPoint)</li>
                  <li>Digital Marketing</li>
                  <li>Accounting & Finance</li>
                  <li>HR & Office Administration</li>
                  <li>Interview Preparation</li>
                  <li>Resume Building</li>
                  <li>Soft Skills & Communication</li>
                </ul>

                <p className="text-gray-800 font-bold mt-4 mb-2">What You Get</p>
                <ul className="text-gray-600">
                  <li>Practical, job-oriented training</li>
                  <li>Expert guidance from experienced trainers</li>
                  <li>Placement assistance</li>
                  <li>Verified job opportunities</li>
                  <li>Free candidate registration</li>
                  <li>Resume upload and profile creation</li>
                  <li>WhatsApp job alerts</li>
                  <li>Interview notifications</li>
                  <li>Career guidance and support</li>
                </ul>

                <p className="text-gray-600 leading-relaxed mt-6">
                  Our mission is to bridge the gap between education and employment by equipping candidates with the right skills and connecting them with trusted employers across Kerala and beyond.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Register with TriaGullJobs today, enhance your skills, and take the next step toward a rewarding career.
                </p>
              </div>
            </div>
          </div>

          {/* Service For Employer */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Services for Employers
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg italic text-gray-700 mb-2">
                  "Hire Better. Train Smarter. Grow Faster."
                </p>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  At TriaGullJobs, we help businesses find the right talent and develop high-performing teams. Our comprehensive recruitment and training solutions are designed to simplify hiring, reduce recruitment costs, and improve employee productivity.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Whether you are a startup, small business, or established organization, TriaGullJobs provides reliable hiring support and professional workforce development.
                </p>

                <p className="text-gray-800 font-bold mt-4 mb-2">Our Employer Services</p>
                
                <p className="text-gray-800 font-semibold mt-4 mb-2">Recruitment & Talent Acquisition</p>
                <ul className="text-gray-600">
                  <li>Free job posting on TriaGullJobs</li>
                  <li>Access to a database of verified candidates</li>
                  <li>Candidate screening and shortlisting</li>
                  <li>Resume filtering based on your requirements</li>
                  <li>Interview scheduling and coordination</li>
                  <li>Bulk hiring support</li>
                  <li>Permanent and temporary staffing solutions</li>
                </ul>

                <p className="text-gray-800 font-semibold mt-4 mb-2">Corporate Training & Staff Development</p>
                <ul className="text-gray-600">
                  <li>Sales Training</li>
                  <li>Marketing & Business Development Training</li>
                  <li>Customer Service Excellence</li>
                  <li>Telecalling & Communication Skills</li>
                  <li>HR & Recruitment Training</li>
                  <li>Office Administration Training</li>
                  <li>MS Office & Advanced Excel</li>
                  <li>Tally Prime & Accounting</li>
                  <li>GST & Payroll Management</li>
                  <li>Digital Marketing</li>
                  <li>Leadership and Team Building</li>
                </ul>

                <p className="text-gray-800 font-bold mt-4 mb-2">Why Choose TriaGullJobs?</p>
                <ul className="text-gray-600">
                  <li>Verified and skilled candidates</li>
                  <li>Faster hiring process</li>
                  <li>Cost-effective recruitment solutions</li>
                  <li>Industry-specific hiring support</li>
                  <li>Professional staff training programs</li>
                  <li>Dedicated employer assistance</li>
                  <li>WhatsApp updates on suitable candidates</li>
                  <li>Customized hiring solutions for every business</li>
                </ul>

                <p className="text-gray-600 leading-relaxed mt-6">
                  Our experienced recruitment team works closely with employers to understand their workforce requirements and deliver candidates who match the required skills, experience, and company culture.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  At TriaGullJobs, we believe that the right people build successful businesses. From recruitment to employee training, we are your trusted partner in building a skilled and productive workforce.
                </p>
                <p className="text-gray-600 leading-relaxed font-semibold">
                  Partner with TriaGullJobs today and build a stronger team for tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


