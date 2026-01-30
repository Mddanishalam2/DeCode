const LanguageSelector = ({ language, setLanguage, theme }) => {
  const isDark = theme === 'vs-dark';

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className={`mb-4 p-2 rounded border outline-none 
        ${isDark ? 'bg-gray-400 text-black' : 'bg-white text-black'}`}
    >
      <option value="c">C</option>
      <option value="cpp">C++</option>
      <option value="java">Java</option>
      <option value="python">Python</option>
    </select>
  );
};

export default LanguageSelector;
