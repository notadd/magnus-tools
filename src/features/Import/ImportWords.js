import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import './ImportWords.css';
import { getRandomColor } from '../util';

export const ImportWords = (props) => {
    window.ga('set', 'page', '/source-text-input-page');
    window.ga('send', 'pageview');
    const contextsFromLocalStorage = JSON.parse(localStorage.getItem("contexts"))
    const [contexts, setContexts] = useState(contextsFromLocalStorage || []);

    useEffect(() => {
        const contextJson = JSON.stringify(contexts);
        localStorage.setItem('contexts', contextJson);
    }, [contexts]);

    const generateVocabulary = () => {
        const text = document.getElementById("sourceText").value;
        const title = document.getElementById("sourceTextTitle").value;
        if (title.length > 0) {
            setContexts([
                ...contexts,
                {
                    id: uuidv4(),
                    name: title,
                    color: getRandomColor()
                }
            ]);
        }
        let importedLines = new Map();
        text.split("\n").map((word) => {
            const myRegexp = /^(\d*):(.*)/;
            const match = myRegexp.exec(word);
            if (match) {
                const lineNo = match[1]
                const text = match[2]
                addPhraseToVocabulary(text, importedLines, lineNo);
            } else {
                addPhraseToVocabulary(word, importedLines);
            }
            return null;
        });
        if (importedLines.size > 0) {
            let words = [];
            importedLines.forEach((v, k) => {
                words.push({ id: uuidv4(), text: k, count: v });
            });
            props.setWords(words);
            props.setIsImportWordsDialogVisible(false);
            props.setIsContextListVisible(true)
            window.ga('send', 'event', 'Vocabulary', 'VocabularyGenerated');
        }
    }

    function addPhraseToVocabulary(text, importedLines) {
        const trimmedText = text.trim()
        if (trimmedText.length > 0) {
            if (importedLines.has(text)) {
                importedLines.set([]);
            }
            else {
                importedLines.set(text, []);
            }
        }
    }

    if (props.isImportWordsDialogVisible) {
        return (
            <div className="importWordsContentArea">
                <div>
                    <input className="sourceTextTitle" id="sourceTextTitle" placeholder="请输入名称"></input>
                </div>
                <div>
                    <textarea id="sourceText" placeholder="将关键字粘贴在下方输入框，换行分割！" style={{ width: "90vw" }} rows="30"></textarea>
                </div>
                <div>
                    <button className="button commandBtn" onClick={generateVocabulary}>保存</button>
                </div>
            </div>);
    }
    else {
        return (<React.Fragment />);
    }
};



