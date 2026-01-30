import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import LanguageSelector from './components/LanguageSelector';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import RunButton from './components/RunButton';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import logo from './assets/logo.png';

const boilerplates = {
  c: `#include <stdio.h> 
int main()
{
    return 0;
}`,
  cpp: `#include<iostream>
#include<cstdio>
#include<cmath>
using namespace std;
int main()
{
    return 0;
}`,
  java: `import java.util.Scanner;
// Don'tchange the class name
class Main
{
    public static void main(String[] args)
    {
        // Write your code here
    }
}`,
  python: `# Write your Python code here`
};

function App() {
  const [language, setLanguage] = useState('c');
  const [code, setCode] = useState(boilerplates['c']);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('vs-dark');
  const [user, setUser] = useState(null);

  useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem('currentUser'));
  if (savedUser) setUser(savedUser);
}, []);

  const toggleTheme = () => {
    setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark');
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(boilerplates[newLang]);
  };

  return (
    <div className={`min-h-screen ${theme === 'vs-dark' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'} p-4`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
  <img src={logo} alt="Logo" className="h-12 w-12 object-cover rounded-full" />
  <h1 className="text-3xl font-bold">DeCode</h1>
</div>
<div className="flex flex-col items-end space-y-2">
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full bg-gray-600 hover:bg-gray-700"
    title="Toggle Theme"
  >
    {theme === 'vs-dark' ? (
      <SunIcon className="h-6 w-6 text-white" />
    ) : (
      <MoonIcon className="h-6 w-6 text-black" />
    )}
  </button>

  {user && (
    <div className="flex items-center space-x-2 mt-2">
      <span className="text-sm font-semibold">{user.username}</span>
      <img
        src={`https://ui-avatars.com/api/?name=${user.username}&background=4F46E5&color=fff`}
        alt="User Avatar"
        className="h-11 w-11 rounded-full object-cover"
      />
    </div>
  )}
</div>

      </div>

      <LanguageSelector language={language} setLanguage={handleLanguageChange} theme={theme} />
      <Editor language={language} code={code} setCode={setCode} theme={theme} />
      <div className="flex gap-4 mt-4">
        <InputBox input={input} setInput={setInput} />
        <OutputBox output={output} />
      </div>
      <RunButton code={code} input={input} language={language} setOutput={setOutput} />
    </div>
  );
}

export default App;
