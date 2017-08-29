
class ToolKit {
    /*
     * 判断对象是否为空
     */
   static isEmpty(obj) {
       if (obj instanceof Array) {
           return obj.length === 0;
       }
       if (obj instanceof Object) {
           for (const ii in obj) {
               if ({}.hasOwnProperty.call(obj, ii)) {  // 如果obj中含有属性，则obj不为空
                   return false;
               }
           }
           return true;
       }
       if (typeof obj === 'string') {
           return obj === '';
       }
       return obj === null || obj === undefined;
   }
}

export default ToolKit;