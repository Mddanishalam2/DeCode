// src/constants/editorConfig.js

export const LANGUAGES = {
  C: 'c',
  CPP: 'cpp',
  JAVA: 'java',
  PYTHON: 'python',
};

export const THEMES = {
  LIGHT: 'vs-light',
  DARK: 'vs-dark',
};

export const BOILERPLATES = {
  [LANGUAGES.C]: `#include <stdio.h> 

int main() {
    // Write your C code here
    return 0;
}`,
  [LANGUAGES.CPP]: `#include <iostream>
using namespace std;

int main() {
    // Write your C++ code here
    return 0;
}`,
  [LANGUAGES.JAVA]: `// Don't change the class name
class Main {
    public static void main(String[] args) {
        // Write your Java code here
    }
}`,
  [LANGUAGES.PYTHON]: `# Write your Python code here`,
};