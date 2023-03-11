
function convertBytesToMegabytes(bytes) {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(3);
  }

  const element = (tag, classes=[], inner) => {
    const node = document.createElement(tag)

    if(classes.length){
        node.classList.add(...classes)
    }  
    if(inner){
        node.innerHTML = inner
    }
    return node  
  }
  
  const noope = () => {}

export const upload = (selector, options = {}) => {

    const upload = options.onUpload ?? noope

    let files = []

    const input = document.querySelector(selector)

    const open = element('button', ['button', 'button-open'], '<span class="button-content">Open</span>')

    const download = element('button', ['button', 'button-download', 'ml-[20px]'], '<span class="button-content">Download </span>')
    download.style.display ='none'

    const preview = element('div', ['preview'])


    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', download)
    input.insertAdjacentElement('afterend', open)
    


    const triggerInput = () => {
        input.click()
    }

    const changeHandler = event => {

        if(event.target.files.length === 0){
            return
        }

        files = Array.from(event.target.files)
        download.style.display ='inline-block'

        preview.innerHTML =''
        files.forEach(file => {
            if(!file.type.match('image')){
                return
            }            
            const reader = new FileReader()

            reader.onload = ev => {
                 preview.insertAdjacentHTML('beforeend', `
                    <div class="preview-item h-[auto] rounded-[8px] overflow-hidden relative">

                        <button data-name=${file.name} class="absolute top-[6px] right-[6px] p-[2px] border border-[black] rounded-[4px] bg-[grey] opacity-[0] hover:opacity-[1] hover:bg-[#FA5858]">
                        <svg width="18px" height="18px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
                        </button>

                        <img class="max-w-[200px]" src="${ev.target.result}" alt="${file.name}" />

                        <div class="file-info bg-[#fff] absolute bottom-0 left-0 right-0 h-[50%] text-[12px] font-[700] bg-[#ffffff90] flex flex-col gap-[6px] p-[4px] rounded-[4px]">
                        <span>${file.name}</span>
                        <span>${convertBytesToMegabytes(file.size)} MB</span>
                        </div>
                    </div>
                 `)
            }

            reader.readAsDataURL(file)
        })

        
    }


    const removeHandler = (event) => {
        if(!event.target.dataset.name) {
            return
        } 

        const {name} = event.target.dataset
        files = files.filter(file => file.name !== name)

        if(!files.length){
            download.style.display ='none'
        }
        
        const block = preview.querySelector(`[data-name="${name}"]`).closest('.preview-item')
        block.classList.add('preview-remove')
        setTimeout(() => block.remove(), 300)
    }


    const clearInfo = (el) => {
        el.style.height = '18%'
        el.classList.add('upload')
        el.innerHTML = '<div class="relative h-[100%] w-[100%]"><div class="preview-info-progress"></div></div>'
    }

    const onUploadHandler = () => {
        preview.querySelectorAll('.preview-item button').forEach(item => item.remove())
        const previewInfo = preview.querySelectorAll('.file-info')
        previewInfo.forEach(clearInfo)
        upload(files)
    }


    open.addEventListener('click', triggerInput)

    input.addEventListener('change', changeHandler)

    preview.addEventListener('click', removeHandler)

    download.addEventListener('click', onUploadHandler)




    options.multi && input.setAttribute('multiple', true)

    if(options.accept && Array.isArray(options.accept)){
        input.setAttribute('accept', options.accept.join(','))
    }

}