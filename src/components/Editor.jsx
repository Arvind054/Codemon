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

function Editor({socketRef, roomId, onCodeChange}) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('dracula')
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
  function handleChange(){
         const code = EditorRef.current;
         onCodeChange(code);
         socketRef.current.emit('code-change', {
            roomId,
             code,
         });
  }
  return (
    <div style={{ padding: '20px' }}>
        <div className="inputs">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          marginBottom: '10px',
          padding: '5px',
          fontSize: '20px',
        }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          marginBottom: '10px',
          padding: '5px',
          fontSize: '20px',
        }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>
      </div>
     
      <CodeMirror
        value={code}
        height="70vh"
        theme={dracula}
        extensions={[languageExtensions[language]]}
        onChange={(e)=>{
         EditorRef.current = e;
         handleChange();
        }}
      />
    </div>
  );
}

export default Editor;
