const InputBox = ({ input, setInput }) => {
  return (
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Custom Input : -"
      className="w-1/2 h-40 p-2 bg-white text-black rounded resize-none"
    />
  );
};
export default InputBox;