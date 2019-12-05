// css3属性获取、设置
/**
 *  css(box,{width:300,opacity:0.5}) 设置
 *  css(box,'width') 获取
 * 
 * @param {*} el 
 * @param {*} attr 
 */
const css = (el,attr) => {
    const transformAttr = ['rotate','rotateX','rotateY','rotateZ','skewX','skewY','scale','scaleX','scaleY','translateX','translateY','translateZ']
    
    const type = o =>{
        let str = Object.prototype.toString.call(o)
        return str.match(/\[object (.*)\]/)[1].toLowerCase()
    }

    const getOrSet = type(attr) == 'object' ? false:true

    // true 获取 
    // false 设置
    if(getOrSet){  
        // 第二个参数为字符串
        if(transformAttr.includes(attr)){ // 是否是css3属性
            return transform()
        }else{
             // 获取css2属性
            return parseFloat(getComputedStyle(el)[attr])
        }
    }else{ 
        // 第二个参数为对象
       const attrKeys = Object.keys(attr)  // 把要设置的属性名，存进数组
       
       for(let v of attrKeys){ // 设置css2
            el.style[v] = v == 'opacity' ? attr[v] : attr[v] + 'px'
       }
       // 设置css3
       transform(attrKeys)
    }




    // 获取、设置css3的属性
    function transform(attrKeys){
        // el.transform = {} // 存储设置的transform的属性
        if(!el.transform){
            el.transform = {}
        }
        
        // 获取
        if(getOrSet){  // attr为字符串
            // 未设置过的属性 获取时为undefined
            // 如果为设置过，则返回默认值
            if(!(Object.keys(el.transform).includes(attr))){ // 未设置过
                return attr === 'scale' ? 1:0
            }

            return el.transform[attr]
        }

        // 设置
        // 存储要设置的属性
        for(let v of attrKeys){
            el.transform[v] = attr[v]
        }
        // 添加属性
        /**
         * 分单位
         *  rotate/skew   deg
         *  scale    
         *  translate     px
         */

        let transformStr = ''
        for(let v of attrKeys){
            switch(v){
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':
                case 'skewX':
                case 'skewY':
                    transformStr += v+`(${el.transform[v]}deg)`
                    break;
                case 'scale':
                case 'scaleX':
                case 'scaleY': 
                    transformStr += v+`(${el.transform[v]})`
                    break;
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                    transformStr += v+`(${el.transform[v]}px)`
                    break;
                
            }
        }
        el.style.transform = transformStr

    }
}

