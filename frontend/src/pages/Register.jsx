import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';
import axios from 'axios';

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
    const [idProof, setIdProof] = useState(null);
    const [addressProof, setAddressProof] = useState(null);

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
            if (type === 'id') {
                setIdProof(file);
            } else if (type === 'address') {
                setAddressProof(file);
            }
        }
    };

    const removeDocument = (type) => {
        if (type === 'id') {
            setIdProof(null);
        } else if (type === 'address') {
            setAddressProof(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // ✅ Use consistent variable names
        const formDataToSend = new FormData();
    
        // ✅ Correct way to append form data
        formDataToSend.append("username", formData.username);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("userType", formData.userType);
    
        if (idProof) formDataToSend.append("idProof", idProof);
        if (addressProof) formDataToSend.append("addressProof", addressProof);
    
        // ✅ Debugging: Ensure FormData has expected values
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }
    
        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/signup",
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
    
            if (response.data.success) {
                alert("Signup successful!");
                window.location.href = "/login";
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Error signing up. Please try again.");
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

                                {["username", "email", "password", "phone"].map((field) => (
                                    <div key={field}>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </label>
                                        <input type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                                            name={field} value={formData[field]} onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder={`Enter your ${field}`} required />
                                    </div>
                                ))}

                                <div className="my-4">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox text-blue-600" required />
                                        <span className="ml-2 text-sm text-gray-700">
                                            I agree to the <Link to="#" className="text-blue-500 mx-1">privacy policy & terms</Link>
                                        </span>
                                    </label>
                                </div>

                                <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors">
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
                                    <label className="block text-sm font-medium text-gray-700">ID Proof</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                        {!idProof ? (
                                            <div className="text-center">
                                                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                                <label className="mt-2 cursor-pointer block">
                                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload("id", e)}
                                                        accept=".pdf,.jpg,.jpeg,.png" />
                                                    <span className="inline-block px-4 py-2 bg-gray-100 text-sm text-gray-700 rounded-md hover:bg-gray-200">
                                                        Upload ID Proof
                                                    </span>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                <span className="text-sm truncate">{idProof.name}</span>
                                                <button type="button" onClick={() => removeDocument("id")}
                                                    className="text-red-500 hover:text-red-700 text-sm">
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(1)}
                                        className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md transition-colors">
                                        Back
                                    </button>
                                    <button type="submit"
                                        className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition-colors">
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