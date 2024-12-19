import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';

const languageExtensions = {
  javascript: javascript(),
  python: python(),
  java: java(),
  cpp: cpp(),
};
const themes = {
  'dracula' : dracula,
  'okaidia' : okaidia
}
function Editor({socketRef, roomId, onCodeChange, setLang}) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [theme, setTheme] = useState('dracula');
  const [fontsize, setFontSize] = useState(20);
  const EditorRef  = useRef(code);
 
  useEffect(()=>{
      if(socketRef.current === null){
        return ;
      }
       const init = async()=>{
         
         await socketRef.current.on('code-change', ({code})=>{
          if(code != null){
          EditorRef.current = code;
          setCode(code);
          }
    });
       }

       init();
       return ()=>{
        socketRef.current.off('code-change');
       }
  })
  function handleLanguage(e){
    setLang(e.target.value);
    setLanguage(e.target.value);
  }
  function handleChange(){
         const code = EditorRef.current;
         onCodeChange(code);
         socketRef.current.emit('code-change', {
            roomId,
             code,
         });
  }
  return (
    <div style={{ padding: '0px' }}>
        <div className="inputs">
          <div className='EditorInputsContainer'> 
          <label htmlFor="languageSelector">Select language</label>
      <select
        value={language}
        onChange={(e)=>handleLanguage(e)}
        className='EditorInputs'
        id='languageSelector'
      >
        
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>
      </div>
      <div className='EditorInputsContainer'> 
      <label htmlFor="ThemeSelector">Select Theme</label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
          className='EditorInputs'
        id='ThemeSelector'
      >
        <option value="dracula">Dark Light</option>
        <option value="okaidia">Dark</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>
      </div>
      <div className='EditorInputsContainer'> 
      <label htmlFor="fontSizeSelector">Font Size</label>
      <select
        value={fontsize}
        onChange={(e) => setFontSize(e.target.value)}
         className='EditorInputs'
        id='fontSizeSelector'
      >
        <option value={10}>10px</option>
        <option value={15}>15px</option>
        <option value={20}>20px</option>
        <option value={25}>25px</option>
      </select>
      </div>
      </div>
      <CodeMirror
        value={code}
        height="85vh"
        theme={themes[theme]}
        extensions={[languageExtensions[language]]}
        onChange={(e)=>{
         EditorRef.current = e;
         handleChange();
        }}
        style={{ fontSize:  `${fontsize}px` }} 
      />
    </div>
  );
}

export default Editor;
