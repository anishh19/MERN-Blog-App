import Header from ".@component/components/header";
function login() {
  return (
    <div className="h-full w-screem">
      <Header currentTab="login" />
      <div className=" w-full flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-6xl py-12">WELCOME </h1>
        <form className="flex text-2xl flex-col gap-4 w-[80]">
          <div className="flex flex-col">
            <label>Email</label>
            <input className="border-2 border-black p-2"></input>
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input className="border-2 border-black p-2"></input>
          </div>

          <button className="h-16 my-4 bg-slate-600 rounded-md text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default login;
