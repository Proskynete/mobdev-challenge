const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 py-4">
      <div className="flex flex-col mb-2 text-sm text-gray-500 text-center">
        <pre className="text-xs text-gray-800 dark:text-gray-100">
          &gt; $ cd ~/eduardoalvarez.dev/2024
          <span className="w-1 h-4 inline-block bg-primary-800 ml-2 rounded-sm motion-safe:animate-ping motion-safe:duration-75"></span>
        </pre>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <a href="https://eduardoalvarez.dev">eduardoalvarez.dev</a>
        </div>
      </div>
    </div>
  );
};

export { Footer };
