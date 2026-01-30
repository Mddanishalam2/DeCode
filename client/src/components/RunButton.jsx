const RunButton = ({ code, input, language, setOutput }) => {
  const runCode = async () => {
    const response = await fetch('http://localhost:5000/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, input, language })
    });
    const data = await response.json();
    setOutput(data.output || data.error);
  };

  return (
    <button
      onClick={runCode}
      className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
    >
      Run
    </button>
  );
};

export default RunButton;