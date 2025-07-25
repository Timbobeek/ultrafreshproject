export const Footer = () => {
  return (
    <footer className="text-background bg-foreground border-background border-4 border-b-0 rounded-t-lg p-2 bottom-0 flex items-center justify-center flex-col">
      <div className="flex justify-center space-x-0.5">
        <div>
          <a href="https://github.com/Timbobeek" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github text-[40px] text-background"/>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/timofey-goloshchapov/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin text-[42px] text-background"/>
          </a>
        </div>
      </div>
      <div className="leading-5">Tim Goloshchapov</div>
    </footer>
  );
};
