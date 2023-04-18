$(()=>{
    const id = $('#id').val();
    const name = $('#gell_name').val();
    const type = $('#grade').val();
    lately_gall_init(id,name,type);
})

const lately_gall_init = (id, name, type) => {
    const modify_storage_json = (jsonData, id, type) => {
        const new_data = new Array();
        const strg_galls = $.parseJSON(jsonData);

        for(let i in strg_galls) {
            if(strg_galls[i] && typeof(strg_galls[i].id) != 'undefined' && (strg_galls[i].id != id || strg_galls[i].type != type)) {
                new_data.push(strg_galls[i]);
            }
        }

        return new_data;
    }

    const value = localStorage.getItem('lately_gallery');
    let strg_galls = null;

    try {
        strg_galls = $.parseJSON(value);
    } catch (e) {
        strg_galls = null;
        localStorage.setItem('lately_gallery', strg_galls);
    }

    if(id) {
        if(strg_galls == null || typeof(strg_galls) != 'object' || typeof(strg_galls[0]) != 'object' || strg_galls[0].id != id || strg_galls[0].type != type) {
            strg_galls = modify_storage_json(value, id, type);

            var type_dir = '';
            if(type == 'm') {
                type_dir = 'm/';
            } else if(type == 'mgall') {
                type_dir = 'mgall/'
            } else {
                type_dir = 'mini/';
            }

            link = '/GCInside/'+ type_dir +'board/lists?id='+ id;

            strg_galls.unshift({ 'id' : id, 'name': name, 'type' : type, 'link' : link});
            localStorage.setItem('lately_gallery', JSON.stringify(strg_galls.slice(0, 50)));
        }
    }
};