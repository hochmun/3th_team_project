
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/header@latest');
$.getScript('https://cdn.jsdelivr.net/npm/@editorjs/list@latest');

window.addEventListener('load',function(){
    const editor = new EditorJS({
        holder: 'editorjs',
        tools:{
            header: {
                class: Header,
                inlineToolbar:['link']
            },
            list: { 
                class: List, 
                inlineToolbar: true 
            } 
        }
    })
})