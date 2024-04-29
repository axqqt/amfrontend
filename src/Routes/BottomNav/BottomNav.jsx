function bottomNav() {
  return (
    <nav className="w-full  fixed bottom-0">
      {/* mobile bottom nav */}
      <div className="container md:hidden flex w-full">
        <div className="flex justify-between items-center p-2 bg-slate-900 w-full">
          <div></div>
          <div>
            <img src="/download.png" alt="logo" width={50} />
          </div>
          <div></div>
        </div>
      </div>
    </nav>
  );
}

export default bottomNav;
