export default function Register() {
    return (
      <>
      <div className="pt-[100px] flex items-center justify-center">
        <div className="card w-auto border shadow-2xl h-auto rounded-md px-10 py-14">
            <div className="text-4xl mb-10">
            Register
            </div>

           <div className="md:flex gap-5">
            <div>
              <div>
                  <div className="text-lg">
                    Email
                  </div>
                  <div>
                      <input type="text" placeholder="Input Email" className="rounded-md border border-black mb-5 pl-2 w-[320px] h-8"/>
                  </div>
                </div>
                <div>
                  <div className="text-lg">
                    Username
                  </div>
                  <div>
                      <input type="text" placeholder="Input Username" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                  </div>
                </div>
                <div>
                  <div className="text-lg">
                    Password
                  </div>
                  <div>
                      <input type="text" placeholder="Input Password" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                  </div>
                </div>
              </div>
                <div>
                <div>
                  <div className="text-lg">
                    First Name
                  </div>
                  <div>
                      <input type="text" placeholder="Input First Name" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                  </div>
                </div>
                <div>
                  <div className="text-lg">
                    Last Name
                  </div>
                  <div>
                      <input type="text" placeholder="Input Last Name" className="rounded-md border border-black pl-2 mb-5 w-[320px] h-8"/>
                  </div>
                </div>
                <div>
                  <div className="text-lg">
                    Role
                  </div>
                  <select className="rounded-md border border-black pl-2 w-[320px] h-8">
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                  </select>
                </div>
              </div>
           </div>


            <div className="flex items-center justify-center mt-5">
                <button className="bg-gray-300 hover:bg-gray-400 rounded-md w-[320px] h-8">Register</button>
            </div>
        </div>
      </div>
      </>
    );
  }