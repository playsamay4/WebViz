export function newAnimWithDevTools(id)
{
    if(window.devToolsEnabled)
    {
        let mainAnim = GSDevTools.getById("main");
        if(mainAnim != undefined)
            mainAnim.kill();
    }
    let tl = gsap.timeline({id: id});
    if(window.devToolsEnabled)
        GSDevTools.create({id:'main', animation: tl, persist: false});
    return tl;
}

export function newAnim(id)
{
    let tl = gsap.timeline({id: id});
    return tl;
}


export var easeFunc = CustomEase.create("custom", "M0,0 C0.2,0 0.2,1 0.8,1 1,1 1,1 1,1");
