import React from 'react';
import './Toolbar.css';
import uuidv4 from 'uuid/v4';

export const Toolbar = (props) => {
    const createNew = () => {
        window.ga('set', 'page', '/new-project');
        window.ga('send', 'pageview');
        const retVal = window.confirm("创建一个新的项目将删除之前的所有项目.");
        window.ga('send', 'event', 'Project', 'Created');
        if (retVal === true) {
            localStorage.clear();
            window.location.reload();
        }
    };
    const createWord = () => {
        let word = window.prompt("请输入名称:");
        if (word.length > 0) {
            const wordsFromLocalStorage = JSON.parse(localStorage.getItem("words"))
            wordsFromLocalStorage.push({
                id: uuidv4(), text: word, count: wordsFromLocalStorage.length + 1
            })
            props.setWords(wordsFromLocalStorage);
        }
    }
    const exportJson = () => {
        window.ga('set', 'page', '/export-project');
        window.ga('send', 'pageview');
        let projectJson = [];
        for (var key in localStorage) {
            const item = JSON.parse(localStorage.getItem(key));
            projectJson.push({ key: key, item: item });
        }
        let fileName = window.prompt("导出文件名:");
        if (!fileName) {
            fileName = "Untitled";
        }
        if (!fileName.includes(".")) {
            fileName = `${fileName}.json`;
        }
        download(JSON.stringify(projectJson), fileName, 'text/json');
        window.ga('send', 'event', 'Project', 'ProjectExported');
    };

    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content.toString('utf8')], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    return (<React.Fragment>
        <div className="logoText"><h2>Magnus</h2></div>
        <p className="navText">微服务划分工具</p>
        <div className="menuItem">
            <button className="menu" onClick={createNew}>
                新建
            </button>
        </div>
        <div className="menuItem">
            <button className="menu" onClick={props.toggleImportFileDragAreaVisible}>
                导入
            </button>
        </div>
        <div className="menuItem">
            <button className="menu" onClick={exportJson}>
                导出
            </button>
        </div>
        <div className="menuItem">
            <button className="menu" onClick={createWord}>
                添加
            </button>
        </div>
    </React.Fragment>);
};
