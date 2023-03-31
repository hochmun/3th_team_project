/**
 * 2023/03/16 // 심규영 // 에디터 제작 시작
 */

$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/header@latest');
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/list@latest');
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/raw');
// 심플 이미지
//$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/simple-image@latest');
// 이미지 저장 기능 
// 서버 필요
//$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/image@2.3.0');
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest');
/** 2023/03/27 // 심규영 // embed 수정 (최신화) */
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/embed@2.5.3/dist/bundle.min.js');
//$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/embed@latest');
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/quote@latest');
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/underline@latest');
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/inline-code@1.4.0/dist/bundle.min.js');
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/code@2.8.0/dist/bundle.min.js');
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/marker@1.3.0/dist/bundle.min.js');
$.getScript('https://cdn.jsdelivr.net/npm/editorjs-drag-drop@1.1.13/dist/bundle.min.js');
// 실행 취소 툴 => 필요 없을 듯
//$.getScript('https://cdn.jsdelivr.net/npm/editorjs-undo@2.0.20/dist/bundle.min.js');

let editor;

window.addEventListener('load',function(){
    editor = new EditorJS({
        holder: 'editorjs',
        tools:{
            header: {
                class: Header,
                shortcut: 'CMD+SHIFT+H',
                config: {
                    placeHolder: '제목 입력',
                    levels: [2, 3, 4],
                    defaultLevel: 3
                },
                inlineToolbar:['link']
            },
            list: { 
                class: List, 
                inlineToolbar: true,
                config: {
                    defaultStyle: 'ordered'
                }
            },
            raw: RawTool,
            //simpleImage: SimpleImage,
            /*
            image: {
                class: ImageTool,
                config: {
                    endpoints: {
                        byFile: 'http://127.0.0.1:5500/gall/board/uploadFile',
                        byUrl: 'http://127.0.0.1:5500/gall/board/fetchUrl',
                    }
                }
            }
            */
            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },
            embed: {
                class: Embed,
                config: {
                    services: {
                        youtube: true,
                        instagram: true,
                        facebook: true,
                        twitter: true,
                    }
                },
                inlineToolbar: true,
            },
            quote: {
                class: Quote,
            },
            underline: {
                class: Underline,
            },
            inlineCode: InlineCode,
            code: CodeTool,
            Marker: Marker
        },

        /**
         * 2023/03/17 // 심규영
         * 저장된 데이터 입력
         * 글 수정시 기본 글 불러오기
         * 글 보기시 글 불러오기
         */
         /** 2023/03/26 // 심규영 // Cannot read properties of undefined (reading 'holder') bug 수정 */
        data: {
            time: (new Date()).getTime(),
            version: '2.27.0',
            blocks: [{
                type:'paragraph',
                data: {
                    text: '<p></p>'
                }
            }]
        },

        /**
         * 2023/03/17 // 심규영
         * 읽기 전용 설정
         * 글 보기 페이지 에서 써도 될듯?
         */
         /* 2023/03/27 // 심규영 // 기본 수정 불가로 변경 **/
        readOnly: true,
        //autofocus: true,
        onReady: () => {
            /**
             * 2023/03/17 // 심규영 // 드래그 드롭
             */
            new DragDrop(editor);
        },
    });
})

/**
 * 2023/03/17 // 심규영 // 데이터 저장 함수
 */
function editor_save(){
    editor.save().then((outputData)=>{
        //const parsingoutput = JSON.stringify(outputData);
        window.parent.article_make(outputData);
    }).catch((error)=>{
        console.log('Saving failed : ', error)
    })
}

/**
 * 2023/03/27 // 심규영 // 데이터 수정
 */
function editor_modify(){
    editor.save().then((outputData)=>{
        window.parent.article_modify(outputData);
    }).catch((error)=>{
        console.log('Saving failed : ', error);
    });
}

/** 2023/03/24 // 심규영 // readOnly 설정 변경 // 수정 가능 으로 변경 */
function editor_readOnly() {
    editor.readOnly.toggle();
}

/** 2023/03/26 // 심규영 // 데이터 불러오기 (글 수정) */
/** 2023/03/27 // 심규영 // embed 버그 수정 */
function editor_data_load1(inputData) {
    editor.isReady.then(()=>{
        editor.render(inputData);
    }).then(()=>{
        editor.readOnly.toggle();
        //$(parent.document).find('#editor_iframe1').css('height',$('html').height()+'px');
    }).catch((error)=>{
        console.log('dataLoad failed : ',error);
    });
}

/** 2023/03/28 // 심규영 // 데이터 불러오기 (글 보기) */
function editor_data_load2(inputData) {
    editor.isReady.then(()=>{
        editor.render(inputData);
    }).then(()=>{
       //$(parent.document).find('#editor_iframe2').css('height',$('html').height()+'px');
    }).catch((error)=>{
        console.log('dataLoad failed : ',error);
    });
}