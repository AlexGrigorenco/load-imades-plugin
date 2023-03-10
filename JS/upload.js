


export const upload = (selector, options = {}) => {

    const input = document.querySelector(selector)

    const open = document.createElement('button')
    open.classList.add('button')
    open.classList.add('button-open')
    open.innerHTML = `<span class="button-content">Open</span>`

    const preview = document.createElement('div')
    preview.classList.add('preview')


    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', open)
    


    const triggerInput = () => {
        input.click()
    }

    const changeHandler = event => {

        if(event.target.files.length === 0){
            return
        }

        const files = Array.from(event.target.files)


        preview.innerHTML =''
        files.forEach(file => {
            if(!file.type.match('image')){
                return
            }

            const reader = new FileReader()

            reader.onload = ev => {
                 console.log(ev.target.result)
                 preview.insertAdjacentHTML('beforeend', `
                    <div class="preview-item h-[auto] rounded-[8px] overflow-hidden relative">
                        <button class="absolute top-[6px] right-[6px] p-[2px] border border-[black] rounded-[4px] bg-[grey] opacity-[0] hover:opacity-[1] hover:bg-[#FA5858]">
                        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                        <svg width="18px" height="18px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
                        </button>
                        <img class="max-w-[200px]" src="${ev.target.result}" alt="${file.name}" />
                    </div>
                 `)
            }

            reader.readAsDataURL(file)
        })

        
    }


    open.addEventListener('click', triggerInput)

    input.addEventListener('change', changeHandler)




    options.multi && input.setAttribute('multiple', true)

    if(options.accept && Array.isArray(options.accept)){
        input.setAttribute('accept', options.accept.join(','))
    }

}