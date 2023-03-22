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
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/embed@latest');
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
                        twitch_video: true,
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
        data: {},

        /**
         * 2023/03/17 // 심규영
         * 읽기 전용 설정
         * 글 보기 페이지 에서 써도 될듯?
         */
        readOnly: false,
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
 * 글작성, 글 수정
 */
async function editor_save(){
    editor.save().then((outputData)=>{
        const parsingoutput = JSON.stringify(outputData);
        window.parent.article_make(parsingoutput);
    }).catch((error)=>{
        console.log('Saving failed : ', error)
    })
}