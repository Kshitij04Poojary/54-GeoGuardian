import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Eye, EyeOff } from 'lucide-react';  // Add icons for show/hide password
import axios from 'axios'

function Register() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        userType: 'Citizen',
        phone: '',
    });
    const [organizationCertificate, setOrganizationCertificate] = useState(null);
    const [addressProof, setAddressProof] = useState(null);
    const [showPassword, setShowPassword] = useState(false);  // State for toggling password visibility

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileUpload = (type, e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (type === 'organization') {
                setOrganizationCertificate(file);
            } else if (type === 'address') {
                setAddressProof(file);
            }
        }
    };

    const removeDocument = (type) => {
        if (type === 'organization') {
            setOrganizationCertificate(null);
        } else if (type === 'address') {
            setAddressProof(null);
        }
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const signupResponse = await axios.post("http://localhost:8000/api/auth/signup", {
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                username: formData.username,
                userType: formData.userType
            });
    
            if (!signupResponse.data.success) {
                alert("Signup failed: " + signupResponse.data.message);
                return;
            }
    
            const userId = signupResponse.data.result._id;
    
            if (formData.userType !== "Citizen") { 
                const documentData = new FormData();
                
                if (formData.userType === "Admin" && organizationCertificate) {
                    documentData.append("document1", organizationCertificate);
                } 
                if (formData.userType === "Organization" && addressProof) {
                    documentData.append("document2", addressProof);
                }

                if (documentData.has("document1") || documentData.has("document2")) {
                    await axios.post(`http://localhost:8000/api/upload-documents/${userId}`, documentData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
                }
            }
    
            navigate("/login"); 
    
        } catch (error) {
            console.error(error);
            alert("Error occurred during signup or document upload.");
        }
    };
    
    const isMultiStep = formData.userType === "NGO" || formData.userType === "Organization";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EDF2F7] p-6">
            <div className="w-full max-w-md">
                {isMultiStep && (
                    <div className="mb-6 flex items-center justify-center">
                        <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold 
                          ${step === 1 ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}> 1 </div>
                        </div>
                        <div className="w-16 h-1 bg-gray-300 relative flex items-center">
                            <div className={`h-1 ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'} w-full`}></div>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold 
                          ${step === 2 ? 'bg-blue-500 text-white' : step === 1 ? 'bg-gray-300 text-gray-600' : 'bg-green-500 text-white'}`}> 2 </div>
                        </div>
                    </div>
                )}

                <div className="bg-white shadow-md rounded-lg p-8">
                    {!isMultiStep || step === 1 ? (
                        <>
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold">Sign Up</h2>
                                <p className="text-gray-600 mt-2">Enter your personal details</p>
                            </div>

                            <form className="space-y-6" onSubmit={isMultiStep ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit}>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">User Type</label>
                                    <select name="userType" value={formData.userType} onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                        <option value="Admin">Admin</option>
                                        <option value="Organization">Organization</option>
                                        <option value="NGO">NGO</option>
                                        <option value="Citizen">Citizen</option>
                                    </select>
                                </div>

                                {["username", "email", "phone"].map((field) => (
                                    <div key={field}>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </label>
                                        <input type={field === "email" ? "email" : "text"}
                                            name={field} value={formData[field]} onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder={`Enter your ${field}`} required />
                                    </div>
                                ))}

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"}
                                            name="password" value={formData.password} onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your password" required />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400">
                                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="my-4">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox text-blue-600" required />
                                        <span className="ml-2 text-sm text-gray-700">
                                            I agree to the <Link to="#" className="text-blue-500 mx-1">privacy policy & terms</Link>
                                        </span>
                                    </label>
                                </div>

                                <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors cursor-pointer">
                                    {isMultiStep ? "Next" : "Submit"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold">Upload Documents</h2>
                                <p className="text-gray-600 mt-2">Please provide verification documents</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">Organization Certificate</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                        {!organizationCertificate ? (
                                            <div className="text-center">
                                                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                                <label className="mt-2 cursor-pointer block">
                                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload("organization", e)}
                                                        accept=".pdf,.jpg,.jpeg,.png" />
                                                    <span className="inline-block px-4 py-2 bg-gray-100 text-sm text-gray-700 rounded-md hover:bg-gray-200">
                                                        Upload Organization Certificate
                                                    </span>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                <span className="text-sm truncate">{organizationCertificate.name}</span>
                                                <button type="button" onClick={() => removeDocument("organization")}
                                                    className="text-red-500 hover:text-red-700 text-sm">
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(1)}
                                        className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md transition-colors cursor-pointer">
                                        Back
                                    </button>
                                    <button type="submit"
                                        className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition-colors cursor-pointer">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                {!isMultiStep && (
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?
                        <Link to="/login" className="text-blue-500 hover:underline ml-1">
                            Sign in
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
