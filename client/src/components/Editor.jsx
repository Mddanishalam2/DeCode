import MonacoEditor from 'react-monaco-editor';

const Editor = ({ language, code, setCode, theme }) => {
  return (
    <div className="border border-gray-700 rounded">
      <MonacoEditor
        width="100%"
        height="400"
        language={language}
        theme={theme} // use dynamic theme here
        value={code}
        onChange={setCode}
        options={{ fontSize: 16, automaticLayout: true }}
      />
    </div>
  );
};

export default Editor;
