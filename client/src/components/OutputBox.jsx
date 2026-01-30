const OutputBox = ({ output }) => {
  return (
    <textarea
      value={output}
      readOnly
      placeholder="Output : -"
      className="w-1/2 h-40 p-2 bg-white text-black rounded resize-none"
    />
  );
};

export default OutputBox;