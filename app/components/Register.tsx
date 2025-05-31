import { useState } from "react";
const Register=()=>{
const [email,setEmail]=useState("");
const [name,setName]=useState("");
const [password,setPassword]=useState("");

const handleSubmit=(e)=>{
e.preventDeafult()


}

return(
    <div>
    <form
    onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6">
    <h3>
        Registra qui
    </h3>
    <h4>Nome</h4>
    <input
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    /> 
    <h4>Email</h4>
    <input
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    />
    <h4>Password</h4>
    <input
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    />
     <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
            Registra
            </button> 
    </form>   
         
    </div>
   
)
}
export default Register